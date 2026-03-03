import { clearByPrefix } from '../../../utils/redisCache';
import { withCache } from '../../../utils/withCache';
import QueryBuilder from '../../builder/QueryBuilder';
import { TReport } from './report.interface';
import { Report } from './report.model';

const CACHE_TTL = 30;
const CACHE_PREFIX = 'report:list';

const createReport = async (payload: TReport) => {
  const result = await Report.create(payload);
  return result;
};

const getAllReport = async (query: Record<string, unknown>) => {
  const cacheKey = `${CACHE_PREFIX}:${JSON.stringify(query)}`;

  return withCache(cacheKey, CACHE_TTL, async () => {
    const modifiedQuery = { ...query };

    if (query.sortBy) {
      const sortBy = query.sortBy as string;
      const sortOrder = (query.sortOrder as string) || 'desc';
      const direction = sortOrder === 'asc' ? '' : '-';
      modifiedQuery.sort = `${direction}${sortBy}`;
      delete modifiedQuery.sortBy;
      delete modifiedQuery.sortOrder;
    }

    const reportQuery = new QueryBuilder(Report.find(), modifiedQuery)
      .search([
        'bangla_title',
        'english_title',
        'bangla_short_description',
        'english_short_description',
      ])
      .filter()
      .sort()
      .paginate()
      .fields();

    const [meta, reports] = await Promise.all([
      reportQuery.countTotal(),
      reportQuery.modelQuery.lean(),
    ]);

    return { meta, reports };
  });
};

const getSingleReport = async (id: string) => {
  const cacheKey = `report:single:${id}`;

  return withCache(cacheKey, 60, async () => {
    return Report.findById(id).lean();
  });
};

const updateReport = async (id: string, payload: Partial<TReport>) => {
  const result = await Report.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  await Promise.all([
    clearByPrefix('report:list'),
    clearByPrefix('report:single'),
  ]);

  return result;
};

const deleteReport = async (id: string) => {
  const result = await Report.deleteOne({ _id: id });
  await clearByPrefix('newsByCategory');
  await Promise.all([
    clearByPrefix('report:list'),
    clearByPrefix('report:single'),
  ]);

  return result;
};

export const reportServices = {
  createReport,
  getAllReport,
  getSingleReport,
  updateReport,
  deleteReport,
};

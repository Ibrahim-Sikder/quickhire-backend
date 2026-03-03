/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { TReport } from './report.interface';
import { Report } from './report.model';

/* ===============================
   CREATE REPORT
=================================*/
const createReport = async (payload: TReport) => {
  const result = await Report.create(payload);
  return result;
};

/* ===============================
   GET ALL REPORTS
=================================*/
const getAllReport = async (query: Record<string, unknown>) => {
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
};

/* ===============================
   GET SINGLE REPORT
=================================*/
const getSingleReport = async (id: string) => {
  return Report.findById(id).lean();
};

/* ===============================
   UPDATE REPORT
=================================*/
const updateReport = async (id: string, payload: Partial<TReport>) => {
  const result = await Report.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

/* ===============================
   DELETE REPORT
=================================*/
const deleteReport = async (id: string) => {
  const result = await Report.deleteOne({ _id: id });
  return result;
};

export const reportServices = {
  createReport,
  getAllReport,
  getSingleReport,
  updateReport,
  deleteReport,
};
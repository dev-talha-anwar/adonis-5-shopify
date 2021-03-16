import { LucidRow,LucidModel } from '@ioc:Adonis/Lucid/Model'
import { DateTime } from 'luxon';

export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
  query.whereNull('deleted_at')
}

export const softDelete = async (row: LucidRow, column: string = 'deletedAt') => {
  if(row[column] == null) {
      row[column] = DateTime.local();
    } else {
      row[column] = true;
    }
    await row.save();
  }
  export const getAll = async (row: LucidModel) => {
    return await row.all();
  }
}

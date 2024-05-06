import {useContext} from 'react';
import {UserContext} from '../src/libs/context';

export const addSubject = async (db: SQLiteDatabase, subject: Subject) => {
  const insertQuery = `
   INSERT INTO Subjects (name, display_name, code)
   VALUES (?, ?, ?)
 `;
  const values = [subject.firstName, subject.name, subject.phoneNumber];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add subject');
  }
};

export const insertData = async (db, subjects) => {
  const query =
    'INSERT INTO SubjectPreferences (name, display_name, code, subject_id) VALUES (?, ?, ?, ?)';

  const updateQuery =
    'UPDATE SubjectPreferences SET name = ?, display_name = ?, code = ? WHERE subject_id = ?';

  for (const item of subjects) {
    try {
      const [existingRecord] = await db.executeSql(
        'SELECT * FROM SubjectPreferences WHERE subject_id = ?',
        [item.id],
      );

      if (existingRecord.rows.length === 0) {
        // If no existing record found, insert the new record
        await db.executeSql(query, [
          item.name,
          item.display_name,
          item.code,
          item.id,
        ]);
      } else {
        await db.executeSql(updateQuery, [
          item.name,
          item.display_name,
          item.code,
          item.id,
        ]);
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }
};

export const getSubjects = async (db: SQLiteDatabase): Promise<Subject[]> => {
  try {
    const subjects: Subject[] = [];
    const results = await db.executeSql('SELECT * FROM SubjectPreferences');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        subjects.push(result.rows.item(index));
      }
    });
    return subjects;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Subjects from database');
  }
};

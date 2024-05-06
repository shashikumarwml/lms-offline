import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

// Enable promise for SQLite
enablePromise(true);

export const connectToDatabase = async () => {
  return openDatabase(
    {name: 'lms.db', location: 'default'},
    () => {},
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export const createTables = async (db: SQLiteDatabase) => {
  const subjectPreferencesQuery = `
    CREATE TABLE IF NOT EXISTS SubjectPreferences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        display_name TEXT,
        code TEXT,
        subject_id INTEGER
    )`;
  try {
    await db.executeSql(subjectPreferencesQuery);
  } catch (error) {
    console.error(error);
    throw Error('Failed to create tables');
  }
};

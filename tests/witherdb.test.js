const WitherDB = require('../index');
const fs = require('fs');
const path = require('path');

const testFile = path.resolve(__dirname, 'testdb.json');

beforeEach(() => {
    fs.writeFileSync(testFile, '[]');
});

afterAll(() => {
    fs.unlinkSync(testFile);
});

test('should create, read, update, and delete an entry', () => {
    const db = new WitherDB('testdb.json');
    const entry = { id: 1, name: 'Sample', description: 'This is a sample entry' };

    db.createEntry(entry);
    expect(db.readEntries()).toContainEqual(entry);

    const updatedEntry = { id: 1, name: 'Updated', description: 'This is an updated entry' };
    db.updateEntry(1, updatedEntry);
    expect(db.readEntries()).toContainEqual(updatedEntry);

    db.deleteEntry(1);
    expect(db.readEntries()).not.toContainEqual(updatedEntry);
});

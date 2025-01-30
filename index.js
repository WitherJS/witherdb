const fs = require('fs');
const path = require('path');

class WitherDB {
    constructor(filename = 'database.json') {
        this.filename = path.resolve(__dirname, filename);
        this.data = this.loadData();
    }

    loadData() {
        try {
            const data = fs.readFileSync(this.filename);
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    saveData() {
        fs.writeFileSync(this.filename, JSON.stringify(this.data, null, 2));
    }

    createEntry(entry) {
        this.data.push(entry);
        this.saveData();
    }

    readEntries() {
        return this.data;
    }

    updateEntry(id, newEntry) {
        const index = this.data.findIndex(entry => entry.id === id);
        if (index !== -1) {
            this.data[index] = newEntry;
            this.saveData();
        }
    }

    deleteEntry(id) {
        this.data = this.data.filter(entry => entry.id !== id);
        this.saveData();
    }
}

module.exports = WitherDB;

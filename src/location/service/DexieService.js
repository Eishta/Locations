import Dexie from 'dexie';


const db = new Dexie('LocationsDB');
db.version(1).stores({ locations: '++id, &location' });


class DBService {
    getAll() {
        return db.table('locations')
            .toArray();
    }
    put(location) {
        return db.table('locations')
            .add(location)
    }
    get(id) {
        return db.table('locations').get(id)
    }
    update(id, location) {
        return db.table('locations')
            .update(id, location)
    }
    delete(id) {
        return db.table('locations')
            .delete(id)
    }
}

export const Service = new DBService()
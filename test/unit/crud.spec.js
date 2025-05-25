describe('CRUD Operations', function() {
    let storage;
    
    beforeEach(function() {
        // Simular localStorage para las pruebas
        storage = {
            items: [],
            getItem: function(key) {
                return JSON.stringify(this.items);
            },
            setItem: function(key, value) {
                this.items = JSON.parse(value);
            }
        };
        
        // Mock del localStorage
        spyOn(window.localStorage, 'getItem').and.callFake(function(key) {
            return storage.getItem(key);
        });
        spyOn(window.localStorage, 'setItem').and.callFake(function(key, value) {
            return storage.setItem(key, value);
        });
    });
    
    describe('Create Operation', function() {
        it('should add a new item', function() {
            const newItem = { id: 1, name: 'Test Item', description: 'Test Description' };
            
            // Función para crear item (debes tener esta función en tu app)
            createItem(newItem);
            
            const items = JSON.parse(localStorage.getItem('items'));
            expect(items.length).toBe(1);
            expect(items[0].name).toBe('Test Item');
        });
        
        it('should generate unique IDs', function() {
            createItem({ name: 'Item 1' });
            createItem({ name: 'Item 2' });
            
            const items = JSON.parse(localStorage.getItem('items'));
            expect(items[0].id).not.toBe(items[1].id);
        });
    });
    
    describe('Read Operation', function() {
        it('should retrieve all items', function() {
            storage.items = [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' }
            ];
            
            const items = getAllItems();
            expect(items.length).toBe(2);
        });
        
        it('should retrieve item by ID', function() {
            storage.items = [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' }
            ];
            
            const item = getItemById(1);
            expect(item.name).toBe('Item 1');
        });
    });
    
    describe('Update Operation', function() {
        it('should update existing item', function() {
            storage.items = [{ id: 1, name: 'Old Name' }];
            
            updateItem(1, { name: 'New Name' });
            
            const items = JSON.parse(localStorage.getItem('items'));
            expect(items[0].name).toBe('New Name');
        });
    });
    
    describe('Delete Operation', function() {
        it('should delete item by ID', function() {
            storage.items = [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' }
            ];
            
            deleteItem(1);
            
            const items = JSON.parse(localStorage.getItem('items'));
            expect(items.length).toBe(1);
            expect(items[0].id).toBe(2);
        });
    });
});
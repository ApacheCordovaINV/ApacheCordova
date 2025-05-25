// Pruebas básicas para verificar que el entorno funciona
describe('Configuración de Pruebas', function() {
    it('debería cargar las funciones CRUD', function() {
        expect(typeof createItem).toBe('function');
        expect(typeof getAllItems).toBe('function');
        expect(typeof getItemById).toBe('function');
        expect(typeof updateItem).toBe('function');
        expect(typeof deleteItem).toBe('function');
    });
});

describe('CRUD Básico', function() {
    beforeEach(function() {
        localStorage.clear();
    });
    
    it('debería crear y recuperar un item', function() {
        const item = createItem({ name: 'Test', email: 'test@test.com' });
        expect(item.id).toBeDefined();
        
        const items = getAllItems();
        expect(items.length).toBe(1);
        expect(items[0].name).toBe('Test');
    });
    
    it('debería actualizar un item', function() {
        const item = createItem({ name: 'Original' });
        const updated = updateItem(item.id, { name: 'Updated' });
        
        expect(updated.name).toBe('Updated');
    });
    
    it('debería eliminar un item', function() {
        const item = createItem({ name: 'ToDelete' });
        const result = deleteItem(item.id);
        
        expect(result).toBe(true);
        expect(getAllItems().length).toBe(0);
    });
});
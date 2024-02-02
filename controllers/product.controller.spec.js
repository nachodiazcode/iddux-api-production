// product.controller.spec.js
const { listProducts, listProductById, uploadProduct, updateProduct, deleteProduct } = require('./products');

describe('Product Controller', () => {
    describe('listProducts', () => {
        it('debería devolver un array de productos', () => {
          // Supongamos que aquí tienes una función de prueba para tu base de datos
          // o puedes utilizar bibliotecas de mocks como jest.mock para simular la llamada a la base de datos
          const mockProducts = [{ title: 'Producto 1' }, { title: 'Producto 2' }];
          jest.spyOn(Product, 'find').mockImplementationOnce(() => mockProducts);
    
          const result = listProducts({}, {});
    
          expect(result).toEqual(mockProducts);
        });
      });
    
});
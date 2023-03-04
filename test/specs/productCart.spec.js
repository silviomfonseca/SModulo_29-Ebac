const productsViewScreen = require('../screens/productView.screen')

describe('Product List', () => {

    it('should list products', async () => {
        expect(await productsViewScreen.product('ngrid Running Jacket')).toExist()
        expect(await productsViewScreen.productList()).toBeElementsArrayOfSize(5)
    })

    

})
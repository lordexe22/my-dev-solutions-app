// #section Imports
import styles from './productMaker.module.css';
import { useProductMaker } from './productMaker.hooks';
// #end-section

// #component ProductMaker
const ProductMaker = () => {
  // #hook useProductMaker
  const {
    isModalOpen,
    formData,
    isEditing,
    openModal,
    closeModal,
    setFormField,
    createProduct,
    products,
    editProduct,
    showDeleteConfirm,
    productToDelete,
    showDeleteConfirmation,
    hideDeleteConfirmation,
    confirmDeleteProduct
  } = useProductMaker();
  // #end-hook

  // #function formatPrice
  const formatPrice = (price: { type: string; value: number }) => {
    const currencySymbols: Record<string, string> = {
      pesos: '$',
      usd: 'USD',
      eur: '€'
    };
    
    return `${currencySymbols[price.type] || price.type} ${price.value.toLocaleString()}`;
  };
  // #end-function

  // #function getProductToDeleteName
  const getProductToDeleteName = () => {
    const product = products.find(p => p.id === productToDelete);
    return product ? product.name : '';
  };
  // #end-function
  
  // #section return
  return (
    <div className={styles.container}>
      {/* #section Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Product Maker Module</h1>
        <button 
          className={styles.createButton}
          onClick={openModal}
        >
          + Crear Producto
        </button>
      </div>
      {/* #end-section */}
      {/* #section Product List */}
      <div className={styles.productListContainer}>
        <h2 className={styles.productListTitle}>Lista de Productos</h2>
        
        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>Lista vacía</h3>
            <p>Cree su primer producto</p>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                {/* #section Product Image */}
                <div className={styles.productImagePlaceholder}>
                  📷
                </div>
                {/* #end-section */}
                
                {/* #section Product Info */}
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  
                  {product.description.main && (
                    <p className={styles.productDescription}>
                      {product.description.main}
                    </p>
                  )}
                  
                  <p className={styles.productPrice}>
                    {formatPrice(product.price)}
                  </p>
                  
                  <div className={styles.productActions}>
                    <button
                      className={styles.editButton}
                      onClick={() => editProduct(product)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => product.id && showDeleteConfirmation(product.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                {/* #end-section */}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* #end-section */}
      {/* #section Modal form */}
      {isModalOpen && (        
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
              </h2>
              <button 
                className={styles.closeButton}
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label htmlFor="productName" className={styles.label}>
                  Nombre del Producto
                </label>
                <input
                  id="productName"
                  type="text"
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) => setFormField('name', e.target.value)}
                  placeholder="Ingresa el nombre del producto"
                  autoFocus
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="productDescription" className={styles.label}>
                  Descripción
                </label>
                <input
                  id="productDescription"
                  type="text"
                  className={styles.input}
                  value={formData.description.main}
                  onChange={(e) => setFormField('description', { 
                    ...formData.description, 
                    main: e.target.value 
                  })}
                  placeholder="Descripción del producto"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="productPrice" className={styles.label}>
                  Precio
                </label>
                <input
                  id="productPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  className={styles.input}
                  value={formData.price.value}
                  onChange={(e) => setFormField('price', {
                    ...formData.price,
                    value: parseFloat(e.target.value) || 0
                  })}
                  placeholder="0.00"
                />
              </div>
              
              <div className={styles.modalActions}>
                <button
                  className={styles.confirmButton}
                  onClick={createProduct}
                  disabled={!formData.name.trim()}
                >
                  {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* #end-section */}
      {/* #section Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className={styles.modalOverlay} onClick={hideDeleteConfirmation}>
          <div className={styles.deleteModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.deleteModalHeader}>
              <h3 className={styles.deleteModalTitle}>¿Confirmar eliminación?</h3>
              <p className={styles.deleteModalMessage}>
                ¿Estás seguro de que deseas eliminar el producto "{getProductToDeleteName()}"? 
                Esta acción no se puede deshacer.
              </p>
            </div>
            <div className={styles.deleteModalActions}>
              <button
                className={styles.confirmDeleteButton}
                onClick={confirmDeleteProduct}
              >
                Confirmar
              </button>
              <button
                className={styles.cancelButton}
                onClick={hideDeleteConfirmation}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* #end-section */}
    </div>
  );
  // #end-section
};

export default ProductMaker;
// #end-component
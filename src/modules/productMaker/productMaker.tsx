// #section Imports
import styles from './productMaker.module.css';
import { useProductMaker, useCustomCategories } from './productMaker.hooks';
import React from 'react';
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
    confirmDeleteProduct,
    addCategoryToProduct,
    removeCategoryFromProduct,
    addTag,
    removeTag,
    pm_handleImageUpload,
    pm_removeImage,
    pm_setMainImage,
    pm_reorderImages,
    pm_updateStock,
    pm_toggleAvailability,
    pm_setLowStockThreshold
  } = useProductMaker();
  // #end-hook

  // #hook useCustomCategories
  const {
    categories,
    showDeleteConfirm: showCategoryDeleteConfirm,
    categoryToDelete,
    isCategoryFormOpen,
    categoryFormData,
    isCategoryEditing,
    editingCategoryId,
    addCustomCategory,
    updateCustomCategory,
    deleteCustomCategory,
    showDeleteConfirmation: showCategoryDeleteConfirmation,
    hideDeleteConfirmation: hideCategoryDeleteConfirmation,
    openCategoryForm,
    closeCategoryForm,
    editCategory,
    setCategoryFormField,
    handleImageUpload,
    removeImage,
    // resetCategoryForm
  } = useCustomCategories();
  // #end-hook

  // #state [tagInput, setTagInput] = '' 
  const [tagInput, setTagInput] = React.useState('');
  // #end-state

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
        {/* #section Title */}
        <h1 className={styles.title}>Product Maker Module</h1>
        {/* #end-section */}
        {/* #section Create Button */}
        <button 
          className={styles.createButton}
          onClick={openCategoryForm}
        >
          + Crear Categoría
        </button>
        {/* #end-section */}
      </div>
      {/* #end-section */}
      
      {/* #section Category List */}
      <div className={styles.productListContainer}>
        {/* #section Title */}
        <h2 className={styles.productListTitle}>Categorías de Productos</h2>
        {/* #end-section */}
        
        {/* #section Categories */}
        {categories.map((category) => {
          const categoryProducts = products.filter(product => 
            product.customCategories?.includes(category.id) || 
            (category.id === 'general-category' && (!product.customCategories || product.customCategories.length === 0))
          );
          
          return (
            <div key={category.id} className={styles.categoryBlock}>
              {/* #section Category Header */}
              <div className={styles.categoryHeader} style={{ backgroundColor: category.color }} onClick={() => {
                const updatedCategory = categories.find(cat => cat.id === category.id);
                if (updatedCategory) {
                  updateCustomCategory(category.id, {
                    ...updatedCategory,
                    isExpanded: !updatedCategory.isExpanded
                  });
                }
              }}>
                <div className={styles.categoryInfo}>
                  {category.image ? (
                    <img src={typeof category.image === 'string' ? category.image : URL.createObjectURL(category.image)} 
                        alt={category.name} className={styles.categoryImage} />
                  ) : (
                    <div className={styles.categoryImagePlaceholder}>
                      📁
                    </div>
                  )}
                  <div>
                    <h3 className={styles.categoryName}>{category.name}</h3>
                    <p className={styles.categoryDescription}>{category.description}</p>
                  </div>
                </div>
                <div className={styles.categoryActions}>
                  <button
                    className={styles.editCategoryButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      editCategory(category, category.id);
                    }}
                  >
                    ✏️
                  </button>
                  {category.id !== 'general-category' && (
                    <button
                      className={styles.deleteCategoryButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        showCategoryDeleteConfirmation(category.id);
                      }}
                    >
                      🗑️
                    </button>
                  )}
                  <span className={styles.expandIcon}>
                    {category.isExpanded ? '▼' : '▶'}
                  </span>
                </div>
              </div>
              {/* #end-section */}
              {/* #section Category Content */}
              {category.isExpanded && (
                <div className={styles.categoryContent} style={{ backgroundColor: category.color + '20' }}>
                  <div className={styles.productGrid}>
                    {/* #section Add Product Button */}
                    <div className={styles.addProductCard} onClick={() => {
                      setFormField('customCategories', [category.id]);
                      openModal();
                    }}>
                      <div className={styles.addProductIcon}>+</div>
                      <p>Agregar Producto</p>
                    </div>
                    {/* #end-section */}
                    
{/* #section Products */}
{categoryProducts.map((product) => (
  <div
    key={product.id}
    className={`
      ${styles.productCard}
      ${product.stock !== undefined && product.lowStockThreshold !== undefined && product.stock <= product.lowStockThreshold ? styles.productCardLowStock : ''}
      ${product.available === false ? styles.productCardUnavailable : ''}
    `}
  >
    <div className={styles.productImageContainer}>
      <div className={styles.productImagePlaceholder}>
        {product.images?.main ? (
          <img
            src={typeof product.images.main === 'string' ? product.images.main : URL.createObjectURL(product.images.main)}
            alt={product.name}
            className={styles.productImage}
          />
        ) : (
          '📷'
        )}
      </div>
    </div>
    <div className={styles.productInfo}>
      <h3 className={styles.productName}>{product.name}</h3>
      <p className={styles.productPrice}>
        {formatPrice(product.price)}
      </p>
      {product.description.main && (
        <p className={styles.productDescription}>
          {product.description.main}
        </p>
      )}
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
  </div>
))}
{/* #end-section */}
 
                  </div>
                </div>
              )}
              {/* #end-section */}
            </div>
          );
        })}
        {/* #end-section */}
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

        {/* Nombre */}
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

        {/* Descripción */}
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

        {/* Precio */}
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

        {/* Categorías */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Categorías
          </label>
          <div className={styles.categorySelector}>
            {categories.map((category) => (
              <label key={category.id} className={styles.categoryCheckbox}>
                <input
                  type="checkbox"
                  checked={(formData.customCategories || []).includes(category.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      addCategoryToProduct(category.id);
                    } else {
                      removeCategoryFromProduct(category.id);
                    }
                  }}
                />
                <span style={{ color: category.color }}>{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Etiquetas */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Etiquetas
          </label>
          <div className={styles.tagInputContainer}>
            <input
              type="text"
              className={styles.input}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Agregar etiqueta"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag(tagInput);
                  setTagInput('');
                }
              }}
            />
            <button
              type="button"
              className={styles.addTagButton}
              onClick={() => {
                addTag(tagInput);
                setTagInput('');
              }}
            >
              Agregar
            </button>
          </div>
          {formData.tags && formData.tags.length > 0 && (
            <div className={styles.tagsContainer}>
              {formData.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                  <button
                    type="button"
                    className={styles.removeTagButton}
                    onClick={() => removeTag(tag)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Imágenes con Drag & Drop nativo */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Imágenes</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && pm_handleImageUpload(e.target.files)}
          />
          {formData.images && (formData.images.main || formData.images.gallery?.length) && (
            <div className={styles.imagesContainer}>
              {[formData.images.main, ...(formData.images.gallery || [])].map((img, index) => {
                if (!img) return null;
                return (
                  <div
                    key={index}
                    className={`${styles.imageWrapper} ${index === 0 ? styles.mainImage : ''}`}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
                      pm_reorderImages(sourceIndex, index);
                      if (index === 0) pm_setMainImage(sourceIndex);
                    }}
                  >
                    <img
                      src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                      alt={`Imagen ${index + 1}`}
                      className={styles.imagePreview}
                    />
                    <div className={styles.imageActions}>
                      {index !== 0 && (
                        <button
                          type="button"
                          className={styles.setMainButton}
                          onClick={() => pm_setMainImage(index)}
                        >
                          Principal
                        </button>
                      )}
                      <button
                        type="button"
                        className={styles.removeImageButton}
                        onClick={() => pm_removeImage(index, index === 0)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Stock */}
        <div className={styles.formGroup}>
          <label htmlFor="productStock" className={styles.label}>
            Stock
          </label>
          <input
            id="productStock"
            type="number"
            min="0"
            className={styles.input}
            value={formData.stock ?? 0}
            onChange={(e) => pm_updateStock(parseInt(e.target.value, 10) || 0)}
          />
        </div>

        {/* Disponibilidad */}
        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.available ?? true}
              onChange={(e) => pm_toggleAvailability(e.target.checked)}
            />
            Disponible para la venta
          </label>
        </div>

        {/* Umbral de stock bajo */}
        <div className={styles.formGroup}>
          <label htmlFor="lowStockThreshold" className={styles.label}>
            Umbral de Stock Bajo
          </label>
          <input
            id="lowStockThreshold"
            type="number"
            min="0"
            className={styles.input}
            value={formData.lowStockThreshold ?? 0}
            onChange={(e) => pm_setLowStockThreshold(parseInt(e.target.value, 10) || 0)}
            placeholder="Ej: 5"
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

      {/* #section Category Form Modal */}
      {isCategoryFormOpen && (        
        <div className={styles.modalOverlay} onClick={closeCategoryForm}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {isCategoryEditing ? 'Editar Categoría' : 'Crear Nueva Categoría'}
              </h2>
              <button 
                className={styles.closeButton}
                onClick={closeCategoryForm}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              {/* Vista previa de la categoría */}
              <div className={styles.categoryPreview}>
                <div className={styles.categoryPreviewHeader} style={{ backgroundColor: categoryFormData.color || '#3b82f6' }}>
                  <div className={styles.categoryPreviewInfo}>
                    {categoryFormData.image ? (
                      <img 
                        src={typeof categoryFormData.image === 'string' ? categoryFormData.image : URL.createObjectURL(categoryFormData.image)} 
                        alt="Vista previa" 
                        className={styles.categoryPreviewImage} 
                      />
                    ) : (
                      <div className={styles.categoryPreviewImagePlaceholder}>
                        📁
                      </div>
                    )}
                    <div>
                      <h4 className={styles.categoryPreviewName}>
                        {categoryFormData.name || 'Nombre de la categoría'}
                      </h4>
                      <p className={styles.categoryPreviewDescription}>
                        {categoryFormData.description || 'Descripción de la categoría'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="categoryName" className={styles.label}>
                  Nombre de la Categoría
                </label>
                <input
                  id="categoryName"
                  type="text"
                  className={styles.input}
                  value={categoryFormData.name}
                  onChange={(e) => setCategoryFormField('name', e.target.value)}
                  placeholder="Ingresa el nombre de la categoría"
                  autoFocus
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="categoryDescription" className={styles.label}>
                  Descripción
                </label>
                <input
                  id="categoryDescription"
                  type="text"
                  className={styles.input}
                  value={categoryFormData.description || ''}
                  onChange={(e) => setCategoryFormField('description', e.target.value)}
                  placeholder="Descripción de la categoría"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="categoryColor" className={styles.label}>
                  Color
                </label>
                <input
                  id="categoryColor"
                  type="color"
                  className={styles.input}
                  value={categoryFormData.color || '#3b82f6'}
                  onChange={(e) => setCategoryFormField('color', e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Imagen de la Categoría
                </label>
                <div className={styles.imageUploadContainer}>
                  <input
                    type="file"
                    id="categoryImage"
                    className={styles.imageInput}
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file);
                      }
                    }}
                  />
                  <label htmlFor="categoryImage" className={styles.imageUploadButton}>
                    📁 Seleccionar imagen
                  </label>
                  {categoryFormData.image && (
                    <button
                      type="button"
                      className={styles.removeImageButton}
                      onClick={removeImage}
                    >
                      🗑️ Eliminar imagen
                    </button>
                  )}
                </div>
                <p className={styles.imageUploadHint}>
                  Formatos: JPG, PNG, GIF, WebP. Máximo 5MB.
                </p>
              </div>
              
              <div className={styles.modalActions}>
                <button
                  className={styles.confirmButton}
                  onClick={() => {
                    if (!categoryFormData.name.trim()) {
                      console.warn('El nombre de la categoría es requerido');
                      return;
                    }

                    if (isCategoryEditing && editingCategoryId) {
                      updateCustomCategory(editingCategoryId, categoryFormData);
                      console.log('Categoría actualizada:', categoryFormData);
                    } else {
                      addCustomCategory(categoryFormData);
                      console.log('Categoría creada:', categoryFormData);
                    }
                    
                    closeCategoryForm();
                  }}
                  disabled={!categoryFormData.name.trim()}
                >
                  {isCategoryEditing ? 'Actualizar Categoría' : 'Crear Categoría'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* #end-section */}

      {/* #section Category Delete Confirmation Modal */}
      {showCategoryDeleteConfirm && (
        <div className={styles.modalOverlay} onClick={hideCategoryDeleteConfirmation}>
          <div className={styles.deleteModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.deleteModalHeader}>
              <h3 className={styles.deleteModalTitle}>¿Confirmar eliminación?</h3>
              <p className={styles.deleteModalMessage}>
                ¿Estás seguro de que deseas eliminar esta categoría? 
                Los productos dentro de ella se moverán a "General".
              </p>
            </div>
            <div className={styles.deleteModalActions}>
              <button
                className={styles.confirmDeleteButton}
                onClick={() => {
                  if (categoryToDelete) {
                    deleteCustomCategory(categoryToDelete);
                  }
                }}
              >
                Confirmar
              </button>
              <button
                className={styles.cancelButton}
                onClick={hideCategoryDeleteConfirmation}
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
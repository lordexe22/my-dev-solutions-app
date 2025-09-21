// #section Imports
import React, { useState } from 'react';
import { useProducts } from './productMaker.hooks';
import * as config from './productMaker.config';
import * as types from './productMaker.d';
import styles from './productMaker.module.css';
// #end-section

// #interfaces Modal de confirmación de eliminación
interface DeleteModalState {
  isOpen: boolean;
  product: types.ProductBaseType | null;
}

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  productName?: string;
}

interface ImageUploadProps {
  images?: types.ImageType;
  onChange: (images: types.ImageType) => void;
}
// #end-interfaces

// #component DeleteConfirmationModal
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  productName 
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>
          ¿Eliminar producto?
        </h3>
        <p style={{ margin: '0 0 2rem 0', color: '#64748b' }}>
          ¿Estás seguro que deseas eliminar "{productName}"? Esta acción no se puede deshacer.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button className={styles['btn-secondary']} onClick={onCancel}>
            Cancelar
          </button>
          <button className={styles['btn-delete']} onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
// #end-component

// #component ImageUpload
const ImageUpload: React.FC<ImageUploadProps> = ({ images, onChange }) => {
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result) {
          onChange({
            ...images,
            main: result as string
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const readers = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result;
          resolve(result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      onChange({
        main: images?.main ?? '',
        gallery: [...(images?.gallery || []), ...results]
      });
    });
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = [...(images?.gallery || [])];
    newGallery.splice(index, 1);
    onChange({
      main: images?.main ?? '',
      gallery: newGallery
    });
  };

  return (
    <div className={styles['form-section']}>
      <h3>Imágenes</h3>
      
      <div className={styles['form-group']}>
        <label htmlFor="main-image">Imagen Principal</label>
        <input
          id="main-image"
          type="file"
          accept="image/*"
          onChange={handleMainImageChange}
        />
        {images?.main && (
          <div style={{ marginTop: '1rem' }}>
            <img
              src={typeof images.main === 'string' ? images.main : URL.createObjectURL(images.main)}
              alt="Vista previa"
              style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '8px' }}
            />
          </div>
        )}
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="gallery-images">Galería de Imágenes</label>
        <input
          id="gallery-images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
        />
        {images?.gallery && images.gallery.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            {images.gallery.map((img, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                  alt={`Galería ${index + 1}`}
                  style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
// #end-component

// #component ProductMaker
const ProductMaker: React.FC = () => {
  // #hook useProducts() - Gestión de productos y formulario
  const {
    products,
    currentForm,
    isFormVisible,
    setFormField,
    addProduct,
    updateProduct,
    deleteProduct,
    editProduct,
    resetForm,
    toggleFormVisibility,
    isEditing
  } = useProducts();

  // #state Modal de eliminación
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({ 
    isOpen: false, 
    product: null 
  });
  // #end-state

  // #event handleInputChange - Manejo de cambios en campos de texto
  const handleInputChange = (field: keyof types.ProductBaseType, value: unknown) => {
    setFormField(field, value);
  };
  // #end-event

  // #event handlePriceChange - Manejo de cambios en el precio
  const handlePriceChange = (field: 'type' | 'value', value: string | number) => {
    const currentPrice = currentForm.price || { type: 'pesos' as types.MoneyTypes, value: 0 };
    const updatedPrice = {
      ...currentPrice,
      [field]: field === 'value' ? Number(value) : value
    };
    setFormField('price', updatedPrice);
  };
  // #end-event

  // #event handleDescriptionChange - Manejo de cambios en la descripción
  const handleDescriptionChange = (field: 'main' | 'short', value: string) => {
    const currentDescription = currentForm.description || { main: '' };
    const updatedDescription = {
      ...currentDescription,
      [field]: value
    };
    setFormField('description', updatedDescription);
  };
  // #end-event

  // #event handleCategoryChange - Manejo de cambios en categorías
  const handleCategoryChange = (category: types.ProductCategoryType) => {
    const currentCategories = currentForm.category || [];
    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter(cat => cat !== category)
      : [...currentCategories, category];
    setFormField('category', updatedCategories);
  };
  // #end-event

  // #event handleTagsChange - Manejo mejorado de etiquetas (coma y espacio)
  const handleTagsChange = (value: string) => {
    const tags = value
      .split(/[,\s]+/)
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    setFormField('tags', tags);
  };
  // #end-event

  // #event handleColorsChange - Manejo de colores
  const handleColorsChange = (value: string) => {
    const colors = value
      .split(/[,\s]+/)
      .map(color => color.trim())
      .filter(color => color.length > 0);
    setFormField('colors', colors);
  };
  // #end-event

  // #event handleWeightChange - Manejo de peso
  const handleWeightChange = (field: 'value' | 'unit', value: number | types.WeigthUnitType) => {
    const currentWeight = currentForm.weight || { value: undefined, unit: 'kg' as types.WeigthUnitType };
    const updatedWeight = {
      ...currentWeight,
      [field]: value
    };
    setFormField('weight', updatedWeight);
  };
  // #end-event

  // #event handleDimensionChange - Manejo de dimensiones
  const handleDimensionChange = (
    dimension: 'height' | 'width' | 'length', 
    field: 'value' | 'unit', 
    value: number | types.DimensionUnitType
  ) => {
    const currentDimensions = currentForm.dimensions || {};
    const currentDimension = currentDimensions[dimension] || { value: 0, unit: 'cm' as types.DimensionUnitType };
    const updatedDimensions = {
      ...currentDimensions,
      [dimension]: {
        ...currentDimension,
        [field]: value
      }
    };
    setFormField('dimensions', updatedDimensions);
  };
  // #end-event

  // #event handleEdit - Manejo de edición de producto
  const handleEdit = (product: types.ProductBaseType) => {
    editProduct(product);
  };
  // #end-event

  // #event handleDeleteClick - Abrir modal de confirmación
  const handleDeleteClick = (product: types.ProductBaseType) => {
    setDeleteModal({ isOpen: true, product });
  };
  // #end-event

  // #event handleDeleteConfirm - Confirmar eliminación
  const handleDeleteConfirm = () => {
    if (deleteModal.product?.id) {
      deleteProduct(deleteModal.product.id);
    }
    setDeleteModal({ isOpen: false, product: null });
  };
  // #end-event

  // #event handleDeleteCancel - Cancelar eliminación
  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, product: null });
  };
  // #end-event

  // #event handleSubmit - Manejo del envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentForm.name?.trim() || !currentForm.description?.main?.trim()) {
      alert('Nombre y descripción principal son obligatorios');
      return;
    }

    if (isEditing()) {
      updateProduct();
    } else {
      addProduct();
    }
  };
  // #end-event

  // #event handleCancel - Cancelar formulario
  const handleCancel = () => {
    resetForm();
  };
  // #end-event

  // #section return
  return (
    <div className={styles['product-maker-container']}>
      <header>
        <h1>Product Maker</h1>
        <p>Gestiona tus productos de manera fácil y eficiente</p>
      </header>

      {/* Barra de acciones */}
      <div className={styles['actions-bar']}>
        <button 
          className={styles['btn-primary']} 
          onClick={toggleFormVisibility}
        >
          {isFormVisible ? 'Cancelar' : '+ Agregar Producto'}
        </button>
        {products.length > 0 && (
          <span className={styles['products-count']}>
            {products.length} producto{products.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Formulario */}
      {isFormVisible && (
        <form className={styles['product-form']} onSubmit={handleSubmit}>
          <h2>{isEditing() ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          
          {/* Información básica */}
          <div className={styles['form-section']}>
            <h3>Información Básica</h3>
            
            <div className={styles['form-group']}>
              <label htmlFor="name">Nombre *</label>
              <input
                id="name"
                type="text"
                value={currentForm.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ingresa el nombre del producto"
                required
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="brand">Marca</label>
              <input
                id="brand"
                type="text"
                value={currentForm.brand || ''}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                placeholder="Marca del producto"
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="description-main">Descripción Principal *</label>
              <textarea
                id="description-main"
                value={currentForm.description?.main || ''}
                onChange={(e) => handleDescriptionChange('main', e.target.value)}
                placeholder="Describe el producto en detalle"
                rows={4}
                required
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="description-short">Descripción Corta</label>
              <input
                id="description-short"
                type="text"
                value={currentForm.description?.short || ''}
                onChange={(e) => handleDescriptionChange('short', e.target.value)}
                placeholder="Descripción breve del producto"
              />
            </div>
          </div>

          {/* Imágenes */}
          <ImageUpload
            images={currentForm.images}
            onChange={(images) => handleInputChange('images', images)}
          />

          {/* Precio */}
          <div className={styles['form-section']}>
            <h3>Precio</h3>
            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label htmlFor="price-type">Moneda</label>
                <select
                  id="price-type"
                  value={currentForm.price?.type || 'pesos'}
                  onChange={(e) => handlePriceChange('type', e.target.value as types.MoneyTypes)}
                >
                  {config.moneyTypes.map(type => (
                    <option key={type} value={type}>
                      {type.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className={styles['form-group']}>
                <label htmlFor="price-value">Precio</label>
                <input
                  id="price-value"
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentForm.price?.value || ''}
                  onChange={(e) => handlePriceChange('value', e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Categorías */}
          <div className={styles['form-section']}>
            <h3>Categorías</h3>
            <div className={styles['categories-grid']}>
              {config.productCategories.map(category => (
                <label key={category || 'undefined'} className={styles['checkbox-label']}>
                  <input
                    type="checkbox"
                    checked={(currentForm.category || []).includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span>{category ? category.charAt(0).toUpperCase() + category.slice(1) : ''}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Información adicional */}
          <div className={styles['form-section']}>
            <h3>Información Adicional</h3>
            
            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label htmlFor="stock">Stock</label>
                <input
                  id="stock"
                  type="number"
                  min="0"
                  value={currentForm.stock || ''}
                  onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="colors">Colores</label>
                <input
                  id="colors"
                  type="text"
                  value={(currentForm.colors || []).join(', ')}
                  onChange={(e) => handleColorsChange(e.target.value)}
                  placeholder="rojo, azul, verde"
                />
              </div>
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="tags">Etiquetas</label>
              <input
                id="tags"
                type="text"
                value={(currentForm.tags || []).join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="etiqueta1, etiqueta2, etiqueta3"
              />
            </div>

            {/* Peso */}
            <div className={styles['form-group']}>
              <label>Peso</label>
              <div className={styles['form-row']}>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentForm.weight?.value || ''}
                  onChange={(e) => handleWeightChange('value', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
                <select
                  value={currentForm.weight?.unit || 'kg'}
                  onChange={(e) => handleWeightChange('unit', e.target.value as types.WeigthUnitType)}
                >
                  {config.weightUnits.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dimensiones */}
            <div className={styles['form-group']}>
              <label>Dimensiones</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {(['height', 'width', 'length'] as const).map(dim => (
                  <div key={dim}>
                    <label style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {dim === 'height' ? 'Alto' : dim === 'width' ? 'Ancho' : 'Largo'}
                    </label>
                    <div className={styles['form-row']}>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={currentForm.dimensions?.[dim]?.value || ''}
                        onChange={(e) => handleDimensionChange(dim, 'value', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                      <select
                        value={currentForm.dimensions?.[dim]?.unit || 'cm'}
                        onChange={(e) => handleDimensionChange(dim, 'unit', e.target.value as types.DimensionUnitType)}
                      >
                        {config.dimensionUnits.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles['form-group']}>
              <label className={styles['checkbox-label']}>
                <input
                  type="checkbox"
                  checked={currentForm.available !== false}
                  onChange={(e) => handleInputChange('available', e.target.checked)}
                />
                <span>Producto disponible</span>
              </label>
            </div>
          </div>

          {/* Botones del formulario */}
          <div className={styles['form-actions']}>
            <button type="submit" className={styles['btn-primary']}>
              {isEditing() ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
            <button type="button" className={styles['btn-secondary']} onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Lista de productos */}
      {products.length > 0 && (
        <div className={styles['products-list']}>
          <h2>Productos Creados</h2>
          <div className={styles['products-grid']}>
            {products.map(product => (
              <div key={product.id} className={styles['product-card']}>
                {/* Imagen principal */}
                {product.images?.main && (
                  <div style={{ marginBottom: '1rem' }}>
                    <img
                      src={typeof product.images.main === 'string' ? product.images.main : URL.createObjectURL(product.images.main)}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                )}

                <div className={styles['product-header']}>
                  <h3>{product.name}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleEdit(product)}
                      style={{
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                      title="Editar producto"
                    >
                      ✏
                    </button>
                    <button
                      className={styles['btn-delete']}
                      onClick={() => handleDeleteClick(product)}
                      title="Eliminar producto"
                    >
                      ×
                    </button>
                  </div>
                </div>
                
                <div className={styles['product-info']}>
                  {product.brand && (
                    <p><strong>Marca:</strong> {product.brand}</p>
                  )}
                  <p><strong>Precio:</strong> {product.price.value} {product.price.type.toUpperCase()}</p>
                  <p><strong>Descripción:</strong> {product.description.main}</p>
                  
                  {product.colors && product.colors.length > 0 && (
                    <div className={styles['product-tags']}>
                      <strong>Colores:</strong>
                      {product.colors.map(color => (
                        <span key={color} className={styles['tag']}>
                          {color}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {product.category && product.category.length > 0 && (
                    <div className={styles['product-categories']}>
                      <strong>Categorías:</strong>
                      {product.category.map(cat => (
                        <span key={cat} className={styles['category-tag']}>
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {product.tags && product.tags.length > 0 && (
                    <div className={styles['product-tags']}>
                      <strong>Etiquetas:</strong>
                      {product.tags.map(tag => (
                        <span key={tag} className={styles['tag']}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Galería compacta */}
                  {product.images?.gallery && product.images.gallery.length > 0 && (
                    <div style={{ margin: '0.75rem 0' }}>
                      <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Galería:</strong>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
                        gap: '0.5rem'
                      }}>
                        {product.images.gallery.slice(0, 4).map((img, index) => (
                          <img
                            key={index}
                            src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                            alt={`Galería ${index + 1}`}
                            style={{
                              width: '60px',
                              height: '60px',
                              objectFit: 'cover',
                              borderRadius: '6px',
                              border: '1px solid #e5e7eb'
                            }}
                          />
                        ))}
                        {product.images.gallery.length > 4 && (
                          <div style={{
                            width: '60px',
                            height: '60px',
                            background: '#f3f4f6',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            color: '#6b7280',
                            border: '1px solid #e5e7eb'
                          }}>
                            +{product.images.gallery.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className={styles['product-meta']}>
                    {product.stock !== undefined && (
                      <span>Stock: {product.stock}</span>
                    )}
                    {product.sku && (
                      <span>SKU: {product.sku}</span>
                    )}
                    {product.weight?.value && (
                      <span>Peso: {product.weight.value}{product.weight.unit}</span>
                    )}
                    <span>Estado: {product.available ? 'Disponible' : 'No disponible'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estado vacío */}
      {products.length === 0 && !isFormVisible && (
        <div className={styles['empty-state']}>
          <h2>No hay productos creados</h2>
          <p>Comienza creando tu primer producto haciendo clic en "Agregar Producto"</p>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        productName={deleteModal.product?.name}
      />
    </div>
  );
  // #end-section
};

export default ProductMaker;
// #end-component
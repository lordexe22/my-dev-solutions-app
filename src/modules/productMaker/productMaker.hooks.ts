import { useReducer } from "react";
import * as types from "./productMaker.d";
import { initialProductMakerState } from "./productMaker.config";

export const useProducts = () => {
  
  const generateId = (): string => {
    return `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const generateSKU = (name: string, brand?: string): string => {
    const cleanName = name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    const cleanBrand = brand ? brand.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4) : 'NOBR';
    const timestamp = Date.now().toString().slice(-4);
    return `${cleanBrand}-${cleanName}-${timestamp}`;
  };

  const reducer = (
    currentState: types.ProductMakerState, 
    action: types.ProductActionsType
  ): types.ProductMakerState => {
    
    switch (action.type) {
      case 'SET_FORM_FIELD':
        if (!action.payload?.field || action.payload.value === undefined) {
          return currentState;
        }
        
        return {
          ...currentState,
          currentForm: {
            ...currentState.currentForm,
            [action.payload.field]: action.payload.value
          }
        };

      case 'SET_FORM_DATA':
        return {
          ...currentState,
          currentForm: {
            ...currentState.currentForm,
            ...action.payload?.formData
          }
        };

      case 'TOGGLE_FORM':
        return {
          ...currentState,
          isFormVisible: !currentState.isFormVisible,
          // Reset form when closing, but keep data when opening
          currentForm: !currentState.isFormVisible 
            ? currentState.currentForm 
            : initialProductMakerState.currentForm
        };

      case 'EDIT_PRODUCT': {
        if (!action.payload?.product) {
          return currentState;
        }
        
        return {
          ...currentState,
          currentForm: { ...action.payload.product },
          isFormVisible: true
        };
      }

      case 'ADD_PRODUCT': {
        const formData = currentState.currentForm;
        
        // Validación básica
        if (!formData.name?.trim() || !formData.description?.main?.trim()) {
          console.warn('Product name and description are required');
          return currentState;
        }

        const newProduct: types.ProductBaseType = {
          id: generateId(),
          name: formData.name.trim(),
          price: formData.price || { type: 'pesos', value: 0 },
          description: {
            main: formData.description.main.trim(),
            short: formData.description?.short?.trim() || undefined
          },
          category: formData.category && formData.category.length > 0 ? formData.category : undefined,
          tags: formData.tags && formData.tags.length > 0 ? formData.tags : undefined,
          available: formData.available !== undefined ? formData.available : true,
          brand: formData.brand?.trim() || undefined,
          stock: formData.stock !== undefined ? formData.stock : undefined,
          sku: formData.sku?.trim() || generateSKU(formData.name, formData.brand),
          weight: formData.weight?.value ? formData.weight : undefined,
          dimensions: (formData.dimensions?.height || formData.dimensions?.width || formData.dimensions?.length) 
            ? formData.dimensions 
            : undefined,
          colors: formData.colors && formData.colors.length > 0 ? formData.colors : undefined,
          images: formData.images || undefined
        };

        return {
          ...currentState,
          products: [...currentState.products, newProduct],
          currentForm: initialProductMakerState.currentForm,
          isFormVisible: false
        };
      }

      case 'UPDATE_PRODUCT': {
        const formData = currentState.currentForm;
        
        // Validación básica
        if (!formData.name?.trim() || !formData.description?.main?.trim() || !formData.id) {
          console.warn('Product ID, name and description are required for update');
          return currentState;
        }

        const updatedProduct: types.ProductBaseType = {
          id: formData.id,
          name: formData.name.trim(),
          price: formData.price || { type: 'pesos', value: 0 },
          description: {
            main: formData.description.main.trim(),
            short: formData.description?.short?.trim() || undefined
          },
          category: formData.category && formData.category.length > 0 ? formData.category : undefined,
          tags: formData.tags && formData.tags.length > 0 ? formData.tags : undefined,
          available: formData.available !== undefined ? formData.available : true,
          brand: formData.brand?.trim() || undefined,
          stock: formData.stock !== undefined ? formData.stock : undefined,
          sku: formData.sku || generateSKU(formData.name, formData.brand), // Mantener SKU existente o generar nuevo
          weight: formData.weight?.value ? formData.weight : undefined,
          dimensions: (formData.dimensions?.height || formData.dimensions?.width || formData.dimensions?.length) 
            ? formData.dimensions 
            : undefined,
          colors: formData.colors && formData.colors.length > 0 ? formData.colors : undefined,
          images: formData.images || undefined
        };

        return {
          ...currentState,
          products: currentState.products.map(product => 
            product.id === updatedProduct.id ? updatedProduct : product
          ),
          currentForm: initialProductMakerState.currentForm,
          isFormVisible: false
        };
      }

      case 'DELETE_PRODUCT': {
        if (!action.payload?.productId) {
          return currentState;
        }
        
        return {
          ...currentState,
          products: currentState.products.filter(
            product => product.id !== action.payload!.productId
          )
        };
      }

      case 'RESET_FORM':
        return {
          ...currentState,
          currentForm: initialProductMakerState.currentForm,
          isFormVisible: false
        };

      default:
        return currentState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialProductMakerState);

  // Helper functions para facilitar el uso
  const setFormField = (field: keyof types.ProductBaseType, value: unknown) => {
    dispatch({
      type: 'SET_FORM_FIELD',
      payload: { field, value }
    });
  };

  const addProduct = () => {
    dispatch({ type: 'ADD_PRODUCT' });
  };

  const updateProduct = () => {
    dispatch({ type: 'UPDATE_PRODUCT' });
  };

  const deleteProduct = (productId: string) => {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: { productId }
    });
  };

  const editProduct = (product: types.ProductBaseType) => {
    dispatch({
      type: 'EDIT_PRODUCT',
      payload: { product }
    });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const toggleFormVisibility = () => {
    dispatch({ type: 'TOGGLE_FORM' });
  };

  const setFormData = (formData: Partial<types.ProductBaseType>) => {
    dispatch({
      type: 'SET_FORM_DATA',
      payload: { formData }
    });
  };

  // Nueva función para determinar si estamos editando
  const isEditing = (): boolean => {
    return !!(state.currentForm.id);
  };

  return {
    // Estado
    products: state.products,
    currentForm: state.currentForm,
    isFormVisible: state.isFormVisible,
    
    // Acciones
    dispatch,
    setFormField,
    addProduct,
    updateProduct,
    deleteProduct,
    editProduct,
    resetForm,
    toggleFormVisibility,
    setFormData,
    
    // Utilities
    generateId,
    generateSKU,
    isEditing
  };
};
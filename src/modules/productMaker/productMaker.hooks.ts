// #section Imports
import { useReducer } from 'react';
import * as types from './productMaker.d';
import { initialProductState, initialCustomCategoryState, defaultGeneralCategory, initialCategoryFormState, acceptedImageTypes, maxImageSize } from './productMaker.config';
// #end-section

// #interface ModalState
interface ModalState {
  isOpen: boolean;
  formData: types.ProductBaseType;
  isEditing: boolean;
  editingProductId?: string;
}
// #end-interface

// #interface ProductListState
interface ProductListState {
  products: types.ProductBaseType[];
  showDeleteConfirm: boolean;
  productToDelete?: string;
}
// #end-interface

// #function modalFormReducer - Logic for modal form state management
const modalFormReducer = (state: ModalState, action: types.ProductActionsType): ModalState => {
  switch (action.type) {
    case 'TOGGLE_FORM':
      return {
        ...state,
        isOpen: !state.isOpen,
        // Resetear formulario al cerrar
        formData: state.isOpen ? initialProductState : state.formData,
        isEditing: false,
        editingProductId: undefined
      };

    case 'EDIT_PRODUCT':
      if (!action.payload?.product || !action.payload?.productId) return state;
      
      return {
        ...state,
        isOpen: true,
        isEditing: true,
        editingProductId: action.payload.productId,
        formData: { ...action.payload.product }
      };

    case 'SET_FORM_FIELD':
      if (!action.payload?.field || action.payload.value === undefined) return state;
      
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value
        }
      };

    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...initialProductState,
          ...(action.payload?.formData || {})
        }
      };

    case 'RESET_FORM':
      return {
        ...state,
        formData: initialProductState,
        isEditing: false,
        editingProductId: undefined
      };

    default:
      return state;
  }
};
// #end-function

// #function productListReducer
const productListReducer = (state: ProductListState, action: types.ProductActionsType): ProductListState => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      if (!action.payload?.product) return state;
      
      const newProduct = {
        ...action.payload.product,
        id: crypto.randomUUID() // Generar ID único
      };
      
      return {
        ...state,
        products: [...state.products, newProduct]
      };
    }

    case 'UPDATE_PRODUCT':
      if (!action.payload?.productId || !action.payload?.product) return state;
      
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload!.productId
            ? { ...action.payload!.product!, id: action.payload!.productId }
            : product
        )
      };

    case 'DELETE_PRODUCT':
      if (!action.payload?.productId) return state;
      
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload!.productId),
        showDeleteConfirm: false,
        productToDelete: undefined
      };

    case 'TOGGLE_DELETE_CONFIRM':
      return {
        ...state,
        showDeleteConfirm: !state.showDeleteConfirm,
        productToDelete: action.payload?.productId || undefined
      };

    default:
      return state;
  }
};
// #end-function

// #function customCategoryReducer
const customCategoryReducer = (state: types.CustomCategoryListState, action: types.CustomCategoryActionsType): types.CustomCategoryListState => {
  switch (action.type) {
    case 'ADD_CUSTOM_CATEGORY': {
      if (!action.payload?.customCategory) return state;
      
      const newCategory = {
        ...action.payload.customCategory,
        id: crypto.randomUUID()
      };
      
      return {
        ...state,
        categories: [...state.categories, newCategory]
      };
    }

    case 'UPDATE_CUSTOM_CATEGORY':
      if (!action.payload?.categoryId || !action.payload?.customCategory) return state;
      
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload!.categoryId
            ? { ...action.payload!.customCategory!, id: action.payload!.categoryId }
            : category
        )
      };

    case 'DELETE_CUSTOM_CATEGORY':
      if (!action.payload?.categoryId) return state;
      
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload!.categoryId),
        showDeleteConfirm: false,
        categoryToDelete: undefined
      };

    case 'TOGGLE_CATEGORY_PANEL':
      return {
        ...state,
        isPanelOpen: !state.isPanelOpen
      };

    case 'TOGGLE_DELETE_CONFIRM':
      return {
        ...state,
        showDeleteConfirm: !state.showDeleteConfirm,
        categoryToDelete: action.payload?.categoryId || undefined
      };

    default:
      return state;
  }
};
// #end-function

// #function customCategoryFormReducer
const customCategoryFormReducer = (state: types.CustomCategoryFormState, action: types.CustomCategoryActionsType): types.CustomCategoryFormState => {
  switch (action.type) {
    case 'TOGGLE_CATEGORY_FORM':
      return {
        ...state,
        isOpen: !state.isOpen,
        formData: state.isOpen ? initialCustomCategoryState : state.formData,
        isEditing: false,
        editingCategoryId: undefined
      };

    case 'EDIT_CUSTOM_CATEGORY':
      if (!action.payload?.customCategory || !action.payload?.categoryId) return state;
      
      return {
        ...state,
        isOpen: true,
        isEditing: true,
        editingCategoryId: action.payload.categoryId,
        formData: { ...action.payload.customCategory }
      };

    case 'SET_CATEGORY_FORM_FIELD':
      if (!action.payload?.field || action.payload.value === undefined) return state;
      
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value
        }
      };

    case 'RESET_CATEGORY_FORM':
      return {
        ...state,
        formData: initialCustomCategoryState,
        isEditing: false,
        editingCategoryId: undefined
      };

    default:
      return state;
  }
};
// #end-function

// #hook useProductModal
export const useProductModal = () => {
  const [state, dispatch] = useReducer(modalFormReducer, {
    isOpen: false,
    formData: initialProductState,
    isEditing: false,
    editingProductId: undefined
  });

  const openModal = () => {
    dispatch({ type: 'TOGGLE_FORM' });
  };

  const closeModal = () => {
    dispatch({ type: 'TOGGLE_FORM' });
  };

  const editProduct = (product: types.ProductBaseType, productId: string) => {
    dispatch({
      type: 'EDIT_PRODUCT',
      payload: { product, productId }
    });
  };

  const setFormField = (field: keyof types.ProductBaseType, value: unknown) => {
    dispatch({
      type: 'SET_FORM_FIELD',
      payload: { field, value }
    });
  };

  const setFormData = (formData: Partial<types.ProductBaseType>) => {
    dispatch({
      type: 'SET_FORM_DATA',
      payload: { formData }
    });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return {
    isModalOpen: state.isOpen,
    formData: state.formData,
    isEditing: state.isEditing,
    editingProductId: state.editingProductId,
    openModal,
    closeModal,
    editProduct,
    setFormField,
    setFormData,
    resetForm
  };
};
// #end-hook

// #hook useProductList
export const useProductList = () => {
  const [state, dispatch] = useReducer(productListReducer, {
    products: [],
    showDeleteConfirm: false,
    productToDelete: undefined
  });

  const addProduct = (product: types.ProductBaseType) => {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: { product }
    });
  };

  const updateProduct = (productId: string, product: types.ProductBaseType) => {
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: { productId, product }
    });
  };

  const deleteProduct = (productId: string) => {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: { productId }
    });
  };

  const showDeleteConfirmation = (productId: string) => {
    dispatch({
      type: 'TOGGLE_DELETE_CONFIRM',
      payload: { productId }
    });
  };

  const hideDeleteConfirmation = () => {
    dispatch({
      type: 'TOGGLE_DELETE_CONFIRM'
    });
  };

  return {
    products: state.products,
    showDeleteConfirm: state.showDeleteConfirm,
    productToDelete: state.productToDelete,
    addProduct,
    updateProduct,
    deleteProduct,
    showDeleteConfirmation,
    hideDeleteConfirmation
  };
};
// #end-hook

// #hook useProductMaker
export const useProductMaker = () => {
  const modal = useProductModal();
  const productList = useProductList();

  const createProduct = () => {
    // Validar que al menos tenga nombre
    if (!modal.formData.name.trim()) {
      console.warn('El nombre del producto es requerido');
      return;
    }

    if (modal.isEditing && modal.editingProductId) {
      // Actualizar producto existente
      productList.updateProduct(modal.editingProductId, modal.formData);
      console.log('Producto actualizado:', modal.formData);
    } else {
      // Agregar nuevo producto
      productList.addProduct(modal.formData);
      console.log('Producto creado:', modal.formData);
    }
    
    // Cerrar modal y resetear formulario
    modal.closeModal();
  };

  const editProduct = (product: types.ProductBaseType) => {
    if (!product.id) return;
    modal.editProduct(product, product.id);
  };

  const confirmDeleteProduct = () => {
    if (productList.productToDelete) {
      productList.deleteProduct(productList.productToDelete);
    }
  };

  return {
    // Modal properties
    isModalOpen: modal.isModalOpen,
    formData: modal.formData,
    isEditing: modal.isEditing,
    editingProductId: modal.editingProductId,
    
    // Modal actions
    openModal: modal.openModal,
    closeModal: modal.closeModal,
    setFormField: modal.setFormField,
    setFormData: modal.setFormData,
    resetForm: modal.resetForm,
    
    // Product list properties
    products: productList.products,
    showDeleteConfirm: productList.showDeleteConfirm,
    productToDelete: productList.productToDelete,
    
    // Product list actions
    addProduct: productList.addProduct,
    updateProduct: productList.updateProduct,
    deleteProduct: productList.deleteProduct,
    showDeleteConfirmation: productList.showDeleteConfirmation,
    hideDeleteConfirmation: productList.hideDeleteConfirmation,
    
    // Combined actions
    createProduct,
    editProduct,
    confirmDeleteProduct
  };
};
// #end-hook

// #hook useCustomCategories
export const useCustomCategories = () => {
  const [listState, listDispatch] = useReducer(customCategoryReducer, {
    categories: [defaultGeneralCategory],
    showDeleteConfirm: false,
    categoryToDelete: undefined,
    isPanelOpen: false
  });

  const [formState, formDispatch] = useReducer(customCategoryFormReducer, initialCategoryFormState);

  const addCustomCategory = (category: types.CustomCategoryType) => {
    listDispatch({
      type: 'ADD_CUSTOM_CATEGORY',
      payload: { customCategory: category }
    });
  };

  const updateCustomCategory = (categoryId: string, category: types.CustomCategoryType) => {
    listDispatch({
      type: 'UPDATE_CUSTOM_CATEGORY',
      payload: { categoryId, customCategory: category }
    });
  };

  const deleteCustomCategory = (categoryId: string) => {
    listDispatch({
      type: 'DELETE_CUSTOM_CATEGORY',
      payload: { categoryId }
    });
  };

  const toggleCategoryPanel = () => {
    listDispatch({
      type: 'TOGGLE_CATEGORY_PANEL'
    });
  };

  const showDeleteConfirmation = (categoryId: string) => {
    listDispatch({
      type: 'TOGGLE_DELETE_CONFIRM',
      payload: { categoryId }
    });
  };

  const hideDeleteConfirmation = () => {
    listDispatch({
      type: 'TOGGLE_DELETE_CONFIRM'
    });
  };

  const openCategoryForm = () => {
    formDispatch({ type: 'TOGGLE_CATEGORY_FORM' });
  };

  const closeCategoryForm = () => {
    formDispatch({ type: 'TOGGLE_CATEGORY_FORM' });
  };

  const editCategory = (category: types.CustomCategoryType, categoryId: string) => {
    formDispatch({
      type: 'EDIT_CUSTOM_CATEGORY',
      payload: { customCategory: category, categoryId }
    });
  };

  const setCategoryFormField = (field: keyof types.CustomCategoryType, value: unknown) => {
    formDispatch({
      type: 'SET_CATEGORY_FORM_FIELD',
      payload: { field, value }
    });
  };

  const resetCategoryForm = () => {
    formDispatch({ type: 'RESET_CATEGORY_FORM' });
  };

  // #function validateImageFile
  const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
    if (!acceptedImageTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Formato de imagen no válido. Usa JPG, PNG, GIF o WebP.'
      };
    }
    
    if (file.size > maxImageSize) {
      return {
        isValid: false,
        error: 'La imagen es muy grande. Máximo 5MB.'
      };
    }
    
    return { isValid: true };
  };
  // #end-function

  // #function handleImageUpload
  const handleImageUpload = (file: File): boolean => {
    const validation = validateImageFile(file);
    
    if (!validation.isValid) {
      console.warn(validation.error);
      return false;
    }
    
    setCategoryFormField('image', file);
    return true;
  };
  // #end-function

  // #function removeImage
  const removeImage = () => {
    setCategoryFormField('image', undefined);
  };
  // #end-function

  return {
    // List state
    categories: listState.categories,
    showDeleteConfirm: listState.showDeleteConfirm,
    categoryToDelete: listState.categoryToDelete,
    isPanelOpen: listState.isPanelOpen,
    
    // Form state
    isCategoryFormOpen: formState.isOpen,
    categoryFormData: formState.formData,
    isCategoryEditing: formState.isEditing,
    editingCategoryId: formState.editingCategoryId,
    
    // List actions
    addCustomCategory,
    updateCustomCategory,
    deleteCustomCategory,
    toggleCategoryPanel,
    showDeleteConfirmation,
    hideDeleteConfirmation,
    
    // Form actions
    openCategoryForm,
    closeCategoryForm,
    editCategory,
    setCategoryFormField,
    resetCategoryForm,
    
    // Image actions
    handleImageUpload,
    removeImage,
  };
};
// #end-hook
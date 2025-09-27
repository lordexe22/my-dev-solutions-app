/* src\modules\myCustomTag\MyCustomTag.tsx */
// #section Imports
import React from "react";
import { useTags } from "./myCustomTag.hooks";
import { DEFAULT_TAG_PROPS, DEFAULT_TAG_CONFIG } from "./myCustomTag.config";
import type { TagBase, TagMode, TagSize } from "./myCustomTag.d";
import styles from './myCustomTag.module.css';
// #end-section
// #type MyCustomTagProps 
type MyCustomTagProps = {
  tags: TagBase[];
  mode: TagMode;
};
// #end-type
// #component MyCustomTag
const MyCustomTag: React.FC<MyCustomTagProps> = ({ tags, mode = DEFAULT_TAG_CONFIG.mode}) => {
  // #variable labelSize
  const labelSize: TagSize = DEFAULT_TAG_CONFIG.size;
  // #end-variable
  // #hook useTags
  const { tagList, createTag, updateTag, removeTag } = useTags(tags);
  // #end-hook
  // #section return
  return (
    <div className={styles['container']}>
      {mode === "edit" && (
        // #section add-button
        <button
          type="button"
          className={`${styles['add-button']} ${styles[labelSize]}`}
          onClick={() =>
            createTag({ ...DEFAULT_TAG_PROPS, label: "Nueva etiqueta" })
          }
        >
          +
        </button>
        // #end-section
      )}
      {tagList.map((tag, index) => (
        // #section tag-item
        <div 
          key={index} 
          className={`${styles['tag-item']} ${styles[labelSize]}`}
          style={{
            backgroundColor: tag.backgroundColor || DEFAULT_TAG_PROPS.backgroundColor,
            color: tag.textColor || DEFAULT_TAG_PROPS.textColor,
            border: tag.withBorder
              ? `thin solid ${tag.textColor || DEFAULT_TAG_PROPS.textColor}`
              : 'none',            
          }}
        >
          {/* #section tag-label */}
          <span 
            className={styles['tag-label']}
            style={{ color: tag.textColor || DEFAULT_TAG_PROPS.textColor}}
          >
            {tag.icon && <span className="tagIcon">{tag.icon} </span>}
            {tag.label}
          </span>
          {/* #end-section */}
          {mode === "edit" && (
            // #section tag-buttons-container
            <div className={styles['tag-buttons-container']}>
              {/* #section edit-button */}
              <button
                type="button"
                className={styles['edit-button']}
                onClick={() =>
                  updateTag(
                    { ...tag, label: tag.label + " (editado)" },
                    index
                  )
                }
              >
                ✎
              </button>
              {/* #end-section */}
              {/* #section remove-button */}
              <button
                type="button"
                className={styles['remove-button']}
                onClick={() => removeTag(index)}
              >
                ✕
              </button>
              {/* #end-section */}
            </div>
            // #end-section
          )}
        </div>
        // #end-section
      ))}
    </div>
  );
  // #end-section
};
export default MyCustomTag;
// #end-component
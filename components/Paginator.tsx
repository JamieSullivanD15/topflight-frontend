import React, {ChangeEvent, ChangeEventHandler, SyntheticEvent, useContext} from 'react';
import styles from '../styles/Paginator.module.scss';
import elementStyles from '../styles/Elements.module.scss';
import Select from "./Select";
import SearchContext from "../context/SearchContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';

const Paginator = () => {
  // @ts-ignore
  const { paginationParams, handlePageSizeChange, handlePageChange, totalResults } = useContext(SearchContext);
  const { pageSize, page } = paginationParams;
  const numPages = Math.ceil(totalResults / pageSize);
  const previousDisabled = page === 1;
  const nextDisabled = page === numPages;

  const getButtons = () => {
    const buttons = [];

    for (let i = 0; i < numPages; ++i) {
      const disabled = page === (i + 1);

      buttons.push(
        <button
          className={`
            ${styles.circleButton}
            ${disabled ? styles.button__disabled : ''}
          `}
          disabled={disabled}
          onClick={() => handlePageChange(i + 1)}
          key={i}
        >
          { i + 1 }
        </button>
      );
    }

    return buttons;
  };

  return totalResults ? (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <button
          className={elementStyles.iconButton}
          disabled={previousDisabled}
          onClick={() => {
            if (!previousDisabled) handlePageChange(page - 1);
          }}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={`
              ${styles.arrow}
              ${previousDisabled ? styles.arrow__disabled : ''}
            `}
          />
        </button>
        { getButtons() }
        <button
          className={elementStyles.iconButton}
          disabled={nextDisabled}
          onClick={() => {
            if (!nextDisabled) handlePageChange(page + 1);
          }}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`
              ${styles.arrow}
              ${nextDisabled ? styles.arrow__disabled : ''}
            `}
          />
        </button>
      </div>
      <div>
        <Select
          name='pageSize'
          label='Results per page'
          options={['3', '5', '10']}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handlePageSizeChange(e.target.value)}
        />
      </div>
    </div>
  ) : null;
};

export default Paginator;

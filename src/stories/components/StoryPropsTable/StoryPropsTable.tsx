import { FC } from 'react';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './story-props-table.scss';

// types
import { TTableBody } from './types';

export type TPropsStoryPropsTable = {
  tableBodyData: Array<TTableBody>;
};

const StoryPropsTable: FC<TPropsStoryPropsTable> = ({ tableBodyData }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <section className={cx(classNamesWithTheme[className])}>
      {/* TITLE */}
      <h2 className={cx(classNamesWithTheme.title)}>Props</h2>

      {/* TABLE */}
      <table className={cx(classNamesWithTheme.table)}>
        {/* HEADER */}
        <thead>
          <tr className={cx(classNamesWithTheme.rowHeader)}>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {tableBodyData.map(({ defaultValue = '', description, name, type }, key) => (
            <tr className={cx(classNamesWithTheme.rowBody)} key={key}>
              <td className={cx(classNamesWithTheme.columnName)}>{name}</td>
              <td
                className={cx(classNamesWithTheme.columnType)}
                dangerouslySetInnerHTML={{
                  __html: type,
                }}
              />
              <td className={cx(classNamesWithTheme.columnDefaultValue)}>{defaultValue}</td>
              <td
                className={cx(classNamesWithTheme.columnDescription)}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default StoryPropsTable;

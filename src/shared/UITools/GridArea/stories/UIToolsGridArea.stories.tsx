import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { noop } from 'lodash';
import { useState } from 'react';

// components
import { GridArea } from '../GridArea';
import { StoryComponent } from 'stories';

const description = [];

const title = 'UI Tools/GridArea';

export default {
  component: GridArea,
  title,
} satisfies Meta<typeof GridArea>;

const Template: StoryFn<typeof GridArea> = () => {
  const [columns, setColumns] = useState('1');
  const [rows, setRows] = useState('1');

  return (
    <div id="gridAreaWrapper">
      <StoryComponent blocksCodeData={[]} description={description} title="GridArea">
        <div style={{ width: '150px' }}>
          <GridArea
            columns={columns}
            idContainer="gridAreaWrapper"
            onBlurColumns={noop}
            onBlurRows={noop}
            onChangeColumns={setColumns}
            onChangeRows={setRows}
            onClickCell={({ columns, rows }) => {
              setColumns(columns.toString());
              setRows(rows.toString());
            }}
            rows={rows}
          />
        </div>
      </StoryComponent>
    </div>
  );
};

export const UIToolsGridArea = Template.bind({});

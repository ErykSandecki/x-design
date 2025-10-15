import type { Meta, StoryFn } from '@storybook/react-webpack5';
import { useContext } from 'react';

// components
import Tooltip from '../Tooltip';

// core
import { Context } from 'core';

// types
import { ContentGridFlow, StoryComponent, TStoryBlockCode } from 'stories';
import { TooltipPosition } from '../enums';
import { Theme } from 'types';

const description = [`The <code>Tooltip</code> has 12 placements choice.`];

const blockCodeData: TStoryBlockCode = {
  componentName: 'Tooltip',
  imports: [
    {
      items: '{ Tooltip, TooltipPosition }',
      path: 'shared',
    },
  ],
  props: [
    {
      attributes: [
        { name: 'content', value: 'tooltip' },
        { name: 'position', value: 'TooltipPosition.topStart' },
      ],
      children: ' TOP-START',
    },
    {
      attributes: [{ name: 'content', value: 'tooltip' }],
      children: ' TOP-CENTER',
    },
    {
      attributes: [
        { name: 'content', value: 'tooltip' },
        { name: 'position', value: 'TooltipPosition.topEnd' },
      ],
      children: ' TOP-END',
    },
    {
      attributes: [
        { name: 'content', value: 'tooltip' },
        { name: 'position', value: 'TooltipPosition.bottomStart' },
      ],
      children: ' BOTTOM-START',
    },
    {
      attributes: [
        { name: 'content', value: 'tooltip' },
        { name: 'position', value: 'TooltipPosition.bottomCenter' },
      ],
      children: ' BOTTOM-CENTER',
    },
    {
      attributes: [
        { name: 'content', value: 'tooltip' },
        { name: 'position', value: 'TooltipPosition.bottomEnd' },
      ],
      children: ' BOTTOM-END',
    },
    {
      attributes: [
        { name: 'content', value: 'tooltip' },
        { name: 'position', value: 'TooltipPosition.leftStart' },
      ],
      children: ' LEFT-START',
    },
    {
      attributes: [
        { name: 'content', value: 'tooltip' },
        { name: 'position', value: 'TooltipPosition.leftCenter' },
      ],
      children: ' LEFT-CENTER',
    },
    {
      attributes: [
        { name: 'content', value: 'tooltip' },
        { name: 'position', value: 'TooltipPosition.leftEnd' },
      ],
      children: ' LEFT-END',
    },

    {
      attributes: [
        { name: 'content', value: 'tooltip' },
        { name: 'position', value: 'TooltipPosition.rightStart' },
      ],
      children: ' RIGHT-START',
    },
    {
      attributes: [
        { name: 'content', value: 'tooltip' },
        { name: 'position', value: 'TooltipPosition.rightCenter' },
      ],
      children: ' RIGHT-CENTER',
    },
    {
      attributes: [
        { name: 'content', value: 'tooltip' },
        { name: 'position', value: 'TooltipPosition.rightEnd' },
      ],
      children: ' RIGHT-END',
    },
  ],
};

const title = 'UI/Tooltip/Basic Tooltip';

export default {
  component: Tooltip,
  title,
} satisfies Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = (args) => {
  const { theme } = useContext(Context);
  const styles = {
    backgroundColor: theme === Theme.dark ? 'gray' : 'white',
    borderRadius: '5px',
    fontSize: '12px',
    padding: '10px',
  };

  return (
    <StoryComponent
      blocksCodeData={[blockCodeData]}
      contentGridFlow={ContentGridFlow.row}
      description={description}
      title="Basic Tooltip"
    >
      <div style={{ color: theme === Theme.dark ? 'white' : 'black' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '15px',
          }}
        >
          <Tooltip {...args} content="Tooltip" position={TooltipPosition.topStart}>
            <div style={{ ...styles, margin: '0 15px' }}>TOP-START</div>
          </Tooltip>
          <Tooltip {...args} content="Tooltip">
            <div style={{ ...styles, margin: '0 15px' }}>TOP-CENTER</div>
          </Tooltip>
          <Tooltip {...args} content="Tooltip" position={TooltipPosition.topEnd}>
            <div style={{ ...styles, margin: '0 15px' }}>TOP-END</div>
          </Tooltip>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px',
          }}
        >
          <Tooltip {...args} content="Tooltip" position={TooltipPosition.leftStart}>
            <div style={{ ...styles, marginRight: '100px' }}>LEFT-START</div>
          </Tooltip>
          <Tooltip {...args} content="Tooltip" position={TooltipPosition.rightStart}>
            <div style={{ ...styles, marginLeft: '100px' }}>RIGHT-START</div>
          </Tooltip>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px',
          }}
        >
          <Tooltip {...args} content="Tooltip" position={TooltipPosition.leftCenter}>
            <div style={{ ...styles, marginRight: '100px' }}>LEFT-CENTER</div>
          </Tooltip>
          <Tooltip {...args} content="Tooltip" position={TooltipPosition.rightCenter}>
            <div style={{ ...styles, marginLeft: '100px' }}>RIGHT-CENTER</div>
          </Tooltip>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px',
          }}
        >
          <Tooltip {...args} content="Tooltip" position={TooltipPosition.leftEnd}>
            <div style={{ ...styles, marginRight: '100px' }}>LEFT-END</div>
          </Tooltip>
          <Tooltip {...args} content="Tooltip" position={TooltipPosition.rightEnd}>
            <div style={{ ...styles, marginLeft: '100px' }}>RIGHT-END</div>
          </Tooltip>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Tooltip {...args} content="Tooltip" position={TooltipPosition.bottomStart}>
            <div style={{ ...styles, margin: '0 15px' }}>BOTTOM-START</div>
          </Tooltip>
          <Tooltip {...args} content="Tooltip" position={TooltipPosition.bottomCenter}>
            <div style={{ ...styles, margin: '0 15px' }}>BOTTOM-CENTER</div>
          </Tooltip>
          <Tooltip {...args} content="Tooltip" position={TooltipPosition.bottomEnd}>
            <div style={{ ...styles, margin: '0 15px' }}>BOTTOM-END</div>
          </Tooltip>
        </div>
      </div>
    </StoryComponent>
  );
};

export const BasicTooltip = Template.bind({});

BasicTooltip.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  content: {
    table: {
      disable: true,
    },
  },
  position: {
    table: {
      disable: true,
    },
  },
  style: {
    table: {
      disable: true,
    },
  },
};

BasicTooltip.args = {};

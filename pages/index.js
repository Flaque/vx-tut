import Mock from '@vx/mock-data';
import Group from '@vx/group';
import Scale from '@vx/scale';
import Shape from '@vx/shape';
import Axis from '@vx/axis';
import Gradient from '@vx/gradient';
import {extent, max} from 'd3-array';

const data = Mock.appleStock;

const width = 750;
const height = 400;

const x = d => new Date(d.date);
const y = d => d.close;

// Bounds
const margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80,
};
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

const xScale = Scale.scaleTime({
  range: [0, xMax],
  domain: extent(data, x)
});
const yScale = Scale.scaleLinear({
  range: [yMax, 0],
  domain: [0, max(data, y)],
});

export default () => (
  <div>
    <svg width={width} height={height}>
      <Gradient.LinearGradient
        from='#fbc2eb'
        to='#a6c1ee'
        id='gradient'
      />

      <Group top={margin.top} left={margin.left}>

        <Shape.AreaClosed
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          fill={"url(#gradient)"}
          stroke={""}
        />

        <Axis.AxisLeft
          scale={yScale}
          top={0}
          left={0}
          label={'Close Price ($)'}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
        />

        <Axis.AxisBottom
          scale={xScale}
          top={yMax}
          label={'Years'}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
        />

      </Group>
    </svg>
  </div>
)

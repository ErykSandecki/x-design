import { FC, useState } from 'react';

// compoentn
import { INITIAL_COORDINATES, ZoomBox } from 'shared';

const App: FC = () => {
  const [coordinates, setCoordinates] = useState(INITIAL_COORDINATES);

  return (
    <ZoomBox coordinates={coordinates} setCoordinates={setCoordinates}>
      ZoomBox
    </ZoomBox>
  );
};

export default App;

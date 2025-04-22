import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

// components
import PageBuilderPage from 'pages/PageBuilderPage/PageBuilderPage';

// hooks
import { useDispatchMany } from 'hooks';

// store
import { appInit, initLanguage } from 'store/appInitializer/actions';
import {
  isAppLoadedSelector,
  isPendingSelector,
} from 'store/appInitializer/selectors';
import html2canvas from 'html2canvas';

const App: FC = () => {
  const dispatchMany = useDispatchMany();
  const isAppLoaded = useSelector(isAppLoadedSelector);
  const isPending = useSelector(isPendingSelector);

  document.addEventListener('mousemove', async (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const canvas = await html2canvas(document.body, {
      x: x,
      y: y,
      width: 1,
      height: 1,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });

    const ctx = canvas.getContext('2d');
    const pixel = ctx.getImageData(0, 0, 1, 1).data;

    console.log(
      `Pixel at (${x}, ${y}): R:${pixel[0]} G:${pixel[1]} B:${pixel[2]} A:${pixel[3]}`,
    );
  });

  useEffect(() => {
    dispatchMany(appInit(), initLanguage());
  }, []);

  if (!isAppLoaded && isPending) {
    return <main>Init</main>;
  }

  if (!isAppLoaded && !isPending) {
    return <main>Error</main>;
  }

  return <PageBuilderPage />;
};

export default App;

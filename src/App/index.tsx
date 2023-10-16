import tamaguiConfig from '@config/tamagui.config';
import React, {useEffect, useState} from 'react';
import {TamaguiProvider} from 'tamagui';

function App(): JSX.Element {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      {/*
       */}
    </TamaguiProvider>
  );
}

export default App;

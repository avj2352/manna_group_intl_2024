import { type JSX, type FC, useState } from "react";
import { Center, Title, Stack, Button } from '@mantine/core';

// ..custom

const App: FC = (): JSX.Element => {
  // ..states
  const newWebsite: string = "https://mannacorpintl.com";
  const [timer, setTimer] = useState<number>(10);

  // ..evt handlers
  const navigateToSite = () => window.location.href = newWebsite;

  setInterval(() => {
    setTimer(prev => prev - 1);
  }, 3000);

  if (timer < 2) { navigateToSite(); };

  return (<main>
    <Center maw={'100%'} h={'100vh'} bg="var(--mantine-color-gray-light)">
      <Stack
        h={300}
        align="stretch"
        justify="center"
        gap="md"
      >
        <Title order={1}>Redirect to Manna Corp</Title>
        <p>
          Thank you for visiting.
          We are currently working on improving this website's experience.
          <br/>
          Meanwhile you can visit our partner site <strong>"mannacorpintl.com"</strong>
          <br/>
        </p>
        <p>Redirecting to website {timer > 0 ? `in ${timer}s` : '...'}</p>
        <Button
          onClick={() => navigateToSite()}
          variant="filled">
            Visit Manna corp
        </Button>
      </Stack>
    </Center>
  </main>
  );
};

export default App;


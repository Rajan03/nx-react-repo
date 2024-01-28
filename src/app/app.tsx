import { Button } from '@react-app/ui';
import { Icons, Hooks, RequestType } from '@react-app/lib';

export function App() {
  const { data, isLoading, error } = Hooks.useGet({
    queryKey: 'products',
    endPoint: '/products',
  });
  
  const {mutate} = Hooks.useMutate({
    queryKey: 'products/add',
    endPoint: '/products/add',
    data: {
      title: 'BMW Pencil',
    },
    requestType: RequestType.POST,
  });

  console.log(data);
  
  return (
    <div className="h-screen flex flex-col gap-3 items-center justify-center">
      <Button.Primary />
      <Button.Secondary />
      <Icons.AlertIcon />
      <button onClick={mutate}>
        {isLoading ? 'Loading...' : error ? error.message : 'Click me'}
      </button>
    </div>
  );
}

export default App;

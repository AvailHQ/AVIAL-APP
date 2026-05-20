import { tokens } from '../../tokens';

interface PageWrapperProps {
  children: React.ReactNode;
  maxWidth?: string;
  paddingBottom?: string;
}

export default function PageWrapper({ children, maxWidth = '520px', paddingBottom = '72px' }: PageWrapperProps) {
  return (
    <div style={{
      minHeight: '100vh',
      padding: `${tokens.space['3xl']} ${tokens.space.lg} ${paddingBottom}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth,
      }}>
        {children}
      </div>
    </div>
  );
}

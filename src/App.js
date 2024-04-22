import {
  Layout, theme, ConfigProvider,
} from 'antd';
import Dashboard from './app/pages/dashboard';
import './App.scss';

const { Content } = Layout;

function App() {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Poppins',
        },
        components: {
          Layout: {
            bodyBg: 'white',
          },
        },
      }}
    >
      <Layout>
        <Content
          style={{
            padding: 8,
            margin: 0,
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
          <Dashboard />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;

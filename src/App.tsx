import "./App.css";
import {Route, Routes, Navigate, useLocation} from "react-router-dom";
import {Empty, Layout, Menu} from "antd";
import EpisodesList from "./app/components/EpisodesList";
import {
    CharactersListAll,
    CharactersListForEpisode
} from "./app/components/CharactersList";
import {Link,} from "react-router-dom";

const {Content, Sider} = Layout;

const App = () => {
    const location = useLocation();

    return (
        <Layout className="layout">
            <Sider className="sider">
                <br/>
                <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
                    <Menu.Item key="/episodes-list">
                        <Link to="/episodes-list">Episodes</Link>
                    </Menu.Item>
                    <Menu.Item key="/Characters-list">
                        <Link to="/Characters-list">Characters</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Content className="content">
                <Routes>
                    <Route path="/" element={<Navigate replace to="/episodes-list"/>}/>
                    <Route path="/episodes-list" element={<EpisodesList/>}/>
                    <Route
                        path="/episodes-list/:episodeId/characters-list"
                        element={<CharactersListForEpisode/>}
                    />
                    <Route path="/characters-list" element={<CharactersListAll/>}/>
                    <Route path="*" element={<Empty/>}/>
                </Routes>
            </Content>
        </Layout>
    );
}

export default App;

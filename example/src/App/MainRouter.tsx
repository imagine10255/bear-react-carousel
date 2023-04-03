import React from 'react';
import {Route, Routes} from 'react-router-dom';

// Custom
import BaseUsed from 'views/BaseUsed';
import Layout from "views/Layout";
import PropsTry from "views/PropsTry";
import Loop from "views/Feature/Loop";
import VipLevelList from "views/Example/VipLevelList";
import AutoPlayProgress from "views/Example/AutoPlayProgress";
import TextAnimations from "views/Example/TextAnimations";
import PreviewImage from 'views/Example/PreviewImage';


const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="props-try" element={<PropsTry/>} />
                <Route path="feature/loop" element={<Loop/>} />
                <Route path="example/vip-level-list" element={<VipLevelList/>} />
                <Route path="example/auto-play-progress" element={<AutoPlayProgress/>} />
                <Route path="example/text-animations" element={<TextAnimations/>} />
                <Route path="example/preview-image" element={<PreviewImage/>} />

                <Route path="" element={<BaseUsed/>} />
            </Route>
        </Routes>
    );
};

export default MainRouter;


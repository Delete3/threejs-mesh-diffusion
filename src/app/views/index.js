"use client"
import './index.scss';
import React, { useRef } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

import Editor from '../utils/Editor';
import { useUpdateEffect } from '../utils/tool/UseUpdateEffect';

const Main = props => {
  const containerRef = useRef();

  const loadModel = async () => {
    try {
      const res = await axios.get('/assets/Easterfrog.stl', { responseType: 'arraybuffer' });
      const buffrGeometry = new STLLoader().parse(res.data);
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(buffrGeometry, material);
      Editor.scene.add(mesh);
    } catch (error) {
      console.log(error);
    }
  };

  useUpdateEffect(() => {
    if (!containerRef.current) return;

    Editor.setEditor(containerRef.current);
    loadModel();
  }, []);

  return (
    <div className="container">
      aaa
      <div ref={containerRef} className="editor" />
    </div>
  );
};

export default Main;

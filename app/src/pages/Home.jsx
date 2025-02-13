import React from 'react'
import Top5Films from '../data/top5/Top5Films';
import Top5Actors from '../data/top5/Top5Actors';

export const Home = () => {
  return (
    <div>
      <Top5Films/>
      <Top5Actors/>
    </div>
  )
}

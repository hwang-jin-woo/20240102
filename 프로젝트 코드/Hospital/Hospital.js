import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Home } from './Home';
import { Admin } from './Admin';
import { Mg } from './Mg';
import { Mb } from './Mb';
import { FAQ } from './FAQ';
import { Mypage } from './Mypage';
import { Sc } from './Sc';
import styled from 'styled-components';
import { BmiMeasurement } from './BmiMeasurement';




const Container = styled.div`
`
export function Hospital() {

  return <>
        <BrowserRouter>
          <Container>
            <Routes>
              <Route path="/" element={<Navbar />}>                
                <Route index element={<Home />} />
                <Route path="home" element={<Home />}></Route>
                <Route path="mg" element={<Mg />}></Route>
                <Route path="sc" element={<Sc />}></Route>
                <Route path="faq" element={<FAQ />}></Route>                 
                <Route path="bmimeasurement" element={<BmiMeasurement />}></Route>                
        
              </Route>                           
              <Route path="admin" element={<Admin />}></Route>                 
              <Route path="/mypage" element={<Mypage />}></Route>
              <Route path="/mb" element={<Mb />}></Route>

            </Routes>
          </Container>
        </BrowserRouter>   
  </>
}
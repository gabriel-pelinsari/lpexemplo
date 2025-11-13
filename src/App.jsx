import { useEffect, useRef, useState } from 'react'
import img from '../public/background.png'
import img2 from '../public/front.png'
import './App.css'

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const moveTimeout = useRef(null)

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      // Calculate normalized position (-1 to 1)
      const normalizedX = (clientX - centerX) / centerX
      const normalizedY = (clientY - centerY) / centerY

      setMousePosition({ x: normalizedX, y: normalizedY })
      setIsMoving(true)

      if (moveTimeout.current) {
        clearTimeout(moveTimeout.current)
      }

      moveTimeout.current = setTimeout(() => {
        setIsMoving(false)
      }, 150)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (moveTimeout.current) {
        clearTimeout(moveTimeout.current)
      }
    }
  }, [])

  const baseScale = isMoving ? 1.05 : 1
  const style = {
    '--background-translate-x': `${mousePosition.x * -10}px`,
    '--background-translate-y': `${mousePosition.y * -5}px`,
    '--background-scale': baseScale * 1.06,
    '--background-rotate': `${mousePosition.x * -1}deg`,
    
    '--front-translate-x': `${mousePosition.x * -15}px`,
    '--front-translate-y': `${mousePosition.y * -10}px`,
    '--front-scale': baseScale * 1.1,
    '--front-rotate': `${mousePosition.x * -2}deg`,
  }

  const handleSeeMore = () => {
    console.log('Ver mais clicado')
  }

  return (
    <main className="page">
      <div className="container" style={style}>
        <img src={img} alt="background" className="background-image" />
        <img src={img2} alt="front" className="front-image" />
        <h1 className="title">Gabriel Pelinsari</h1>
        <p className="description">
          Desenvolvedor apaixonado por criar experiências digitais únicas e inovadoras. 
          Transformando ideias em realidade através de código e criatividade.
        </p>
        <div className="button-container">
          <button className="see-more-button" onClick={handleSeeMore}>
            Ver Mais
          </button>
        </div>
      </div>
    </main>
  )
}

export default App;
import Link from 'next/link';
import { Swords, Target, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-2xl) var(--spacing-lg)',
      position: 'relative'
    }}>
      {/* Starry Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          width: '2px',
          height: '2px',
          background: 'white',
          boxShadow: '0 0 10px white, 10vw 10vh 0 1px white, 20vw 20vh 0 0 white, 30vw 5vh 0 1px white, 40vw 30vh 0 0 white, 50vw 15vh 0 1px white, 60vw 40vh 0 0 white, 70vw 25vh 0 1px white, 80vw 50vh 0 0 white, 90vw 10vh 0 1px white, 5vw 60vh 0 0 white, 15vw 70vh 0 1px white, 25vw 80vh 0 0 white, 35vw 90vh 0 1px white, 45vw 55vh 0 0 white, 55vw 65vh 0 1px white, 65vw 75vh 0 0 white, 75vw 85vh 0 1px white, 85vw 95vh 0 0 white, 95vw 5vh 0 1px white',
          opacity: 0.5
        }} />
        <div style={{
          position: 'absolute',
          width: '3px',
          height: '3px',
          background: 'white',
          boxShadow: '10vw 80vh 0 1px white, 20vw 10vh 0 0 white, 30vw 90vh 0 1px white, 40vw 20vh 0 0 white, 50vw 70vh 0 1px white, 60vw 30vh 0 0 white, 70vw 60vh 0 1px white, 80vw 40vh 0 0 white, 90vw 50vh 0 1px white, 5vw 15vh 0 0 white, 15vw 25vh 0 1px white, 25vw 35vh 0 0 white, 35vw 45vh 0 1px white, 45vw 55vh 0 0 white, 55vw 65vh 0 1px white, 65vw 75vh 0 0 white, 75vw 85vh 0 1px white, 85vw 95vh 0 0 white, 95vw 5vh 0 1px white',
          opacity: 0.3,
          animation: 'twinkle 5s infinite'
        }} />
      </div>

      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'var(--spacing-2xl)',
        maxWidth: '800px',
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          marginBottom: 'var(--spacing-lg)',
          background: 'linear-gradient(135deg, var(--text-primary), var(--text-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Explore Build Orders
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-md)',
          lineHeight: 1.6
        }}>
          Learn pro-level build orders for Terran, Protoss, and Zerg
        </p>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6
        }}>
          Featuring builds from top players like Clem, uThermal, PiG, MaxPax, and Serral
        </p>
      </div>

      {/* Race Selection */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--spacing-xl)',
        width: '100%',
        maxWidth: '1000px',
        marginBottom: 'var(--spacing-2xl)'
      }}>
        {/* Terran */}
        <Link href="/terran" className="card card-interactive group" style={{
          position: 'relative',
          overflow: 'hidden',
          borderColor: 'var(--terran-primary)',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0'
        }}>
          {/* Background Image */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/images/races/terran.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.3s ease',
            zIndex: 0
          }} className="race-bg" />

          {/* Overlay Gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
            zIndex: 1
          }} />

          {/* Hover Logo */}
          <div className="race-logo" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
            opacity: 0,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 2,
            width: '180px',
            height: '180px',
            backgroundImage: 'url(/images/logos/terran_logo.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: 'invert(1) drop-shadow(0 0 20px rgba(14, 165, 233, 0.6))'
          }} />

          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: 'var(--spacing-xl)',
            textAlign: 'center',
            width: '100%'
          }}>


            <h2 className="race-title" style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#fff',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              marginBottom: 'var(--spacing-xs)',
              letterSpacing: '0.05em',
              transition: 'opacity 0.3s ease'
            }}>
              TERRAN
            </h2>

          </div>
        </Link>

        {/* Protoss */}
        <Link href="/protoss" className="card card-interactive group" style={{
          position: 'relative',
          overflow: 'hidden',
          borderColor: 'var(--protoss-primary)',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0'
        }}>
          {/* Background Image */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/images/races/protoss.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.3s ease',
            zIndex: 0
          }} className="race-bg" />

          {/* Overlay Gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
            zIndex: 1
          }} />

          {/* Hover Logo */}
          <div className="race-logo" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
            opacity: 0,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 2,
            width: '180px',
            height: '180px',
            backgroundImage: 'url(/images/logos/protoss_logo.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: 'invert(1) drop-shadow(0 0 20px rgba(245, 158, 11, 0.6))'
          }} />

          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: 'var(--spacing-xl)',
            textAlign: 'center',
            width: '100%'
          }}>


            <h2 className="race-title" style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#fff',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              marginBottom: 'var(--spacing-xs)',
              letterSpacing: '0.05em',
              transition: 'opacity 0.3s ease'
            }}>
              PROTOSS
            </h2>

          </div>
        </Link>

        {/* Zerg */}
        <Link href="/zerg" className="card card-interactive group" style={{
          position: 'relative',
          overflow: 'hidden',
          borderColor: 'var(--zerg-primary)',
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0'
        }}>
          {/* Background Image */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/images/races/zerg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.3s ease',
            zIndex: 0
          }} className="race-bg" />

          {/* Overlay Gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
            zIndex: 1
          }} />

          {/* Hover Logo */}
          <div className="race-logo" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
            opacity: 0,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 2,
            width: '180px',
            height: '180px',
            backgroundImage: 'url(/images/logos/zerg_logo.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: 'invert(1) drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))'
          }} />

          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: 'var(--spacing-xl)',
            textAlign: 'center',
            width: '100%'
          }}>


            <h2 className="race-title" style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#fff',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              marginBottom: 'var(--spacing-xs)',
              letterSpacing: '0.05em',
              transition: 'opacity 0.3s ease'
            }}>
              ZERG
            </h2>

          </div>
        </Link>
      </div>

      {/* Features */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'var(--spacing-lg)',
        width: '100%',
        maxWidth: '900px',
        marginTop: 'var(--spacing-xl)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-lg)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--text-primary)'
          }}>
            📊 Current Meta
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}>
            Latest build orders from 2024-2025 patch 5.0.11
          </p>
        </div>

        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-lg)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--text-primary)'
          }}>
            🎯 Pro Builds
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}>
            Builds from top players like Clem, MaxPax, and Serral
          </p>
        </div>

        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-lg)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--text-primary)'
          }}>
            📚 Study Mode
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}>
            Step-by-step guides with supply timings and notes
          </p>
        </div>
      </div>
    </div>
  );
}

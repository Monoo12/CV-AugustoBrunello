    // Intersection Observer para animaciones de scroll reveal mejorado
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          
          // Animar barras de progreso si es una sección de skills
          if (entry.target.classList.contains('reveal') && entry.target.querySelector('.skills')) {
            setTimeout(() => animateSkillBars(entry.target), 200);
          }
        }
      });
    }, observerOptions);

    // Observar todos los elementos con clase 'reveal'
    document.addEventListener('DOMContentLoaded', () => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(el => observer.observe(el));
    });

    // Función para animar las barras de progreso de skills mejorada
    function animateSkillBars(container) {
      const meters = container.querySelectorAll('.meter > i');
      meters.forEach((meter, index) => {
        setTimeout(() => {
          const width = meter.style.width;
          meter.style.width = '0%';
          // Pequeño delay para asegurar que el CSS se aplique
          requestAnimationFrame(() => {
            meter.style.width = width;
          });
        }, index * 150); // Delay escalonado para cada barra
      });
    }

    // Smooth scroll para enlaces de navegación mejorado
    document.addEventListener('DOMContentLoaded', () => {
      const anchors = document.querySelectorAll('a[href^="#"]');
      
      anchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          const targetElement = document.querySelector(href);
          
          if (targetElement) {
            e.preventDefault();
            
            // Animación de click en el tab
            anchor.style.transform = 'scale(0.95)';
            setTimeout(() => {
              anchor.style.transform = '';
            }, 150);
            
            // Smooth scroll
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Actualizar URL sin hacer scroll adicional
            history.pushState(null, null, href);
          }
        });
      });
    });

    // Actualizar año en el footer
    document.addEventListener('DOMContentLoaded', () => {
      const yearElement = document.getElementById('year');
      if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
      }
    });

    // Easter egg mejorado: efecto glitch con secuencia de teclas G-L-I-T-C-H
    const glitchSequence = ['g', 'l', 'i', 't', 'c', 'h'];
    let glitchIndex = 0;
    let glitchTimeout;

    document.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();
      
      if (key === glitchSequence[glitchIndex]) {
        glitchIndex++;
        
        // Reiniciar si no se completa la secuencia en 3 segundos
        clearTimeout(glitchTimeout);
        glitchTimeout = setTimeout(() => {
          glitchIndex = 0;
        }, 3000);
        
        if (glitchIndex === glitchSequence.length) {
          // Activar/desactivar efecto glitch
          document.body.classList.toggle('glitch');
          glitchIndex = 0;
          
          // Mostrar mensaje divertido en consola
          if (document.body.classList.contains('glitch')) {
            console.log('🎮 ¡Modo glitch activado! Presiona G-L-I-T-C-H de nuevo para desactivar.');
          } else {
            console.log('✨ Modo glitch desactivado. Todo vuelve a la normalidad.');
          }
        }
      } else {
        glitchIndex = 0;
      }
    });

    // Mejorar la experiencia de hover en dispositivos táctiles
    document.addEventListener('DOMContentLoaded', () => {
      // Detectar si es un dispositivo táctil
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      if (isTouchDevice) {
        // Agregar clase para dispositivos táctiles
        document.body.classList.add('touch-device');
        
        // Manejar hover en cards para dispositivos táctiles
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
          card.addEventListener('touchstart', () => {
            card.classList.add('touch-hover');
          });
          
          card.addEventListener('touchend', () => {
            setTimeout(() => {
              card.classList.remove('touch-hover');
            }, 500);
          });
        });
      }
    });

    // Lazy loading para imágenes (si se agregan en el futuro)
    document.addEventListener('DOMContentLoaded', () => {
      const images = document.querySelectorAll('img[data-src]');
      
      if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          });
        });
        
        images.forEach(img => imageObserver.observe(img));
      }
    });

    // Función para mejorar la accesibilidad del teclado
    document.addEventListener('DOMContentLoaded', () => {
      // Agregar indicadores de foco más visibles
      const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      
      focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
          element.classList.add('focused');
        });
        
        element.addEventListener('blur', () => {
          element.classList.remove('focused');
        });
      });
    });

    // Performance: reducir animaciones si el usuario prefiere menos movimiento
    document.addEventListener('DOMContentLoaded', () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        document.body.classList.add('reduce-motion');
        
        // Deshabilitar animaciones complejas
        const style = document.createElement('style');
        style.textContent = `
          .reduce-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .reduce-motion .reveal {
            opacity: 1 !important;
            transform: none !important;
          }
        `;
        document.head.appendChild(style);
      }
    });

    // Función para manejar el resize de ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Recalcular posiciones si es necesario
        const activeSection = document.querySelector('section:target');
        if (activeSection) {
          activeSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    });

    // Función para mostrar/ocultar loader
    window.addEventListener('load', () => {
      // Remover indicador de carga
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.remove();
        }, 500);
      }
      
      // Mostrar contenido
      document.body.classList.add('loaded');
      
      // Activar animaciones de entrada después de cargar
      setTimeout(() => {
        const heroCard = document.querySelector('.hero-card');
        if (heroCard) {
          heroCard.style.animationDelay = '0s';
        }
      }, 100);
    });

    // Efectos de paralaje ligero en scroll
    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelectorAll('.blob');
      const speed = 0.5;

      parallax.forEach(blob => {
        const yPos = -(scrolled * speed);
        blob.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
      
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick);

    // Animación de typing effect para el título (opcional)
    function typeWriter(element, text, speed = 50) {
      let i = 0;
      element.innerHTML = '';
      
      function type() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      
      type();
    }

    // Efectos de hover mejorados para botones
    document.addEventListener('DOMContentLoaded', () => {
      const buttons = document.querySelectorAll('.btn');
      
      buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
          btn.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
        });
        
        btn.addEventListener('mousedown', () => {
          btn.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        btn.addEventListener('mouseup', () => {
          btn.style.transform = 'translateY(-3px) scale(1.02)';
        });
      });
    });

    // Funciones de utilidad mejoradas
    const utils = {
      // Debounce function para optimizar eventos
      debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      },
      
      // Throttle function para scroll events
      throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
          const currentTime = Date.now();
          
          if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
          } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              func.apply(this, args);
              lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
          }
        };
      },
      
      // Función para obtener la altura del viewport
      getViewportHeight() {
        return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      },
      
      // Función para scroll suave a un elemento
      scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      },

      // Generar partículas decorativas (opcional)
      createParticles(container, count = 20) {
        for (let i = 0; i < count; i++) {
          const particle = document.createElement('div');
          particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(59, 130, 246, 0.6);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s;
          `;
          container.appendChild(particle);
        }
      }
    };

    // Navegación activa (resaltar sección actual)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.tab[href^="#"]');

    const updateActiveNav = utils.throttle(() => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }, 100);

    window.addEventListener('scroll', updateActiveNav);

    // Inicialización cuando el DOM está listo
    document.addEventListener('DOMContentLoaded', () => {
      // Crear un pequeño delay para las animaciones de entrada
      setTimeout(() => {
        document.body.classList.add('animations-ready');
      }, 100);

      // Manejar formularios si los hay en el futuro
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          // Lógica de envío aquí
        });
      });

      // Agregar ripple effect a botones y cards
      const interactiveElements = document.querySelectorAll('.btn, .card, .contact, .tab');
      
      interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
          const ripple = document.createElement('span');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(59, 130, 246, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
          `;
          
          this.style.position = 'relative';
          this.style.overflow = 'hidden';
          this.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });

      // Agregar animación CSS para el ripple
      if (!document.getElementById('ripple-styles')) {
        const rippleStyles = document.createElement('style');
        rippleStyles.id = 'ripple-styles';
        rippleStyles.textContent = `
          @keyframes ripple {
            from {
              transform: scale(0);
              opacity: 1;
            }
            to {
              transform: scale(2);
              opacity: 0;
            }
          }
          
          .tab.active {
            background: var(--panel-light);
            color: var(--primary-light);
            border-color: var(--primary-light);
          }
          
          .tab.active::after {
            width: 80%;
          }
        `;
        document.head.appendChild(rippleStyles);
      }
    });

    // Exportar funciones si se usa en módulos (opcional)
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = { utils, animateSkillBars };
    }

    // Console easter egg
    console.log(`
    🚀 ¡Hola! Soy Augusto
    
    Si estás viendo esto, probablemente te guste curiosear el código.
    
    secretos:
    • Presiona G-L-I-T-C-H para activar el modo glitch
    • El portafolio usa animaciones CSS3 y JavaScript vanilla
    • Todo el diseño es responsive y accesible
    
    ¿Te interesa? ¡Contactame!
    📧 augustobrunello111@gmail.com
    📱 11 3228 0157
    `);
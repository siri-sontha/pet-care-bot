import { useEffect, useRef } from "react";

const MorphingText = () => {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const texts = [
  "🐾 Hi there! Need help with your pet?",
  "💊 Worried your pet is sick? Ask me!",
  "🤖 I’m your friendly Pet Care Bot!",
  "🍖 Curious about pet food or diet?",
  "🐕 Ask me anything about dogs or cats!",
  "❤️ I care for your pets, just like you!",
  "💡 Tips, health, and care — all here!",
  "🐾 Let’s keep your pet happy & healthy!"
];


  const morphTime = 1;
  const cooldownTime = 3;

  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  const setMorph = (fraction) => {
    if (!text1Ref.current || !text2Ref.current) return;

    text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    text1Ref.current.textContent = texts[textIndex % texts.length];
    text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
  };

  const doMorph = () => {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  };

  const doCooldown = () => {
    morph = 0;
    if (!text1Ref.current || !text2Ref.current) return;

    text2Ref.current.style.filter = "";
    text2Ref.current.style.opacity = "100%";

    text1Ref.current.style.filter = "";
    text1Ref.current.style.opacity = "0%";
  };

  const animate = () => {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }
      doMorph();
    } else {
      doCooldown();
    }
  };

  useEffect(() => {
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[textIndex % texts.length];
      text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
    }
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="morphing-text">
      <span id="text1" ref={text1Ref}></span>
      <span id="text2" ref={text2Ref}></span>
    </div>
  );
};

export default MorphingText;

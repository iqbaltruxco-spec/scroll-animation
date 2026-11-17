/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Compass, X } from 'lucide-react';

import parisEiffelImg from './assets/images/paris_eiffel_twilight_1794652936679.jpg';
import parisSeineImg from './assets/images/paris_seine_cruise_1794652937705.jpg';
import parisLouvreImg from './assets/images/paris_louvre_courtyard_1794652937488.jpg';
import parisMontmartreImg from './assets/images/paris_montmartre_streets_1794652938301.jpg';
import parisVersaillesImg from './assets/images/paris_versailles_gardens_1794652938781.jpg';

type NavItem = 'Home' | 'Discover' | 'Tours' | 'About us' | 'Contact';

interface TourItem {
  id: string;
  title: string;
  price: string;
  category: string;
  duration: string;
  description: string;
  image: string;
  alt: string;
}

const NAV_ITEMS: NavItem[] = ['Home', 'Discover', 'Tours', 'About us', 'Contact'];

const POPULAR_TOURS: TourItem[] = [
  {
    id: 'eiffel-twilight',
    title: 'Eiffel Tower Twilight',
    price: '€165',
    category: 'Iconic Landmarks',
    duration: '3 Hours',
    description:
      'Admire the sparkling Eiffel Tower at dusk with priority access and a guided stroll along Trocadéro.',
    image: parisEiffelImg,
    alt: 'Illuminated Eiffel Tower at twilight in Paris',
  },
  {
    id: 'seine-cruise',
    title: 'Seine River Cruise',
    price: '€145',
    category: 'Romantic Cruise',
    duration: '2.5 Hours',
    description:
      'Glide past historic bridges, Notre-Dame, and illuminated riverbanks on a relaxing golden-hour cruise.',
    image: parisSeineImg,
    alt: 'Classic river boat cruising along the Seine River in Paris at golden hour',
  },
  {
    id: 'louvre-treasures',
    title: 'Louvre & Royal Gardens',
    price: '€195',
    category: 'Art & Culture',
    duration: '4 Hours',
    description:
      'Explore world-famous masterpieces inside the Louvre with timed entry, followed by a walk through the Tuileries.',
    image: parisLouvreImg,
    alt: 'Louvre Museum glass pyramid and courtyard reflecting pools in Paris',
  },
  {
    id: 'montmartre-walk',
    title: 'Montmartre Heritage',
    price: '€135',
    category: 'Culinary & Streets',
    duration: '3.5 Hours',
    description:
      'Wander charming cobblestone lanes, visit Sacré-Cœur, and savor authentic French pastries and café culture.',
    image: parisMontmartreImg,
    alt: 'Cobblestone street and classic cafe terrace in Montmartre Paris',
  },
  {
    id: 'versailles-escape',
    title: 'Versailles Palace Escape',
    price: '€240',
    category: 'Royal Day Trip',
    duration: '6 Hours',
    description:
      'Step inside the Hall of Mirrors and explore the manicured royal gardens with seamless round-trip transfers.',
    image: parisVersaillesImg,
    alt: 'Ornate golden gates and manicured gardens of the Palace of Versailles',
  },
];

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItem>('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeTourIndex, setActiveTourIndex] = useState<number>(2);
  const [showAllTours, setShowAllTours] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    travelDates: '',
    email: '',
    preferences: '',
  });
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setContactOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (item: NavItem) => {
    setActiveNav(item);
    if (item === 'Contact') {
      setContactOpen(true);
      return;
    }
    const targetMap: Record<Exclude<NavItem, 'Contact'>, string> = {
      Home: 'home',
      Discover: 'discover',
      Tours: 'popular-tours',
      'About us': 'about-us',
    };
    const el = document.getElementById(targetMap[item]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExploreTour = (tourTitle: string) => {
    setFormState((prev) => ({
      ...prev,
      preferences: `Interested in: ${tourTitle}`,
    }));
    setContactOpen(true);
  };

  const handlePrevTour = () => {
    setActiveTourIndex((prev) => (prev - 1 + POPULAR_TOURS.length) % POPULAR_TOURS.length);
  };

  const handleNextTour = () => {
    setActiveTourIndex((prev) => (prev + 1) % POPULAR_TOURS.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim()) {
      setFormError('Please enter your name and email address.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formState.email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const resetContactModal = () => {
    setContactOpen(false);
    setFormSubmitted(false);
    setFormError('');
    setFormState({ name: '', travelDates: '', email: '', preferences: '' });
  };

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Main Banner Container */}
      <section
        id="home"
        aria-label="Paris Travel Hero Banner"
        className="relative flex min-h-screen w-full flex-col justify-between bg-black px-5 py-6 sm:px-10 sm:py-8 lg:px-14 lg:py-9"
      >
        {/* Top Navigation Bar - Single Line */}
        <header className="relative z-20 flex flex-nowrap items-center justify-between gap-3 sm:gap-6">
          {/* Left: Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('Home');
            }}
            className="shrink-0 whitespace-nowrap text-[18px] font-bold tracking-[-0.03em] text-white sm:text-[22px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            PARIS VOYAGE
          </a>

          {/* Center: Single-Line Pill Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="flex flex-nowrap items-center gap-1.5 overflow-x-auto py-0.5 sm:gap-2"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-150 sm:px-5 sm:py-2 sm:text-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer ${
                    isActive
                      ? 'bg-white text-black'
                      : 'border border-white/15 bg-white/[0.08] text-white hover:bg-white/[0.16]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>

          {/* Right: Open menu */}
          <div className="relative flex shrink-0 items-center">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="shrink-0 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-[13px] font-medium text-white transition-colors duration-150 hover:bg-white/[0.16] sm:px-5 sm:py-2 sm:text-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
            >
              Open menu
            </button>
          </div>
        </header>

        {/* Center Hero Block */}
        <div
          id="discover"
          className="mx-auto mt-20 mb-14 flex max-w-4xl flex-col items-center text-center sm:mt-28 sm:mb-16 lg:mt-32 lg:mb-20"
        >
          <p className="mb-4 text-[14px] font-medium tracking-[0.01em] text-white sm:text-[15px]">
            Explore the Magic of Paris
          </p>

          <h1 className="max-w-3xl text-balance text-[38px] font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-[52px] lg:text-[62px]">
            Discover Paris – Your Dream Destination Awaits
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] font-normal leading-[1.55] tracking-[-0.01em] text-white sm:text-[16px]">
            Experience the beauty, romance, and charm of Paris with unforgettable travel
            experiences. From the iconic Eiffel Tower to charming streets, world-famous museums,
            and delicious French cuisine, we help you explore the best of Paris. Let us make your
            journey memorable with personalized travel packages and hassle-free planning.
          </p>

          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="group mt-8 inline-flex items-center gap-4 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-[14px] font-medium text-black transition-transform duration-150 hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white cursor-pointer"
          >
            <span className="whitespace-nowrap">Explore Paris Tours</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0066FF] text-white transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
            </span>
          </button>
        </div>

        {/* Bottom Cards Row */}
        <div className="flex flex-col items-stretch justify-between gap-6 md:flex-row md:items-start">
          {/* Bottom-Left Card: About Us */}
          <article
            id="about-us"
            className={`w-full max-w-[400px] rounded-[20px] border p-7 text-left transition-colors duration-150 ${
              activeNav === 'About us'
                ? 'border-white/50 bg-white/[0.11]'
                : 'border-white/20 bg-white/[0.07]'
            }`}
          >
            <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-white">
              <Compass className="h-5 w-5 text-[#0066FF]" />
            </div>

            <p className="text-[13px] font-medium text-white">
              About Us – Your Trusted Paris Travel Partner
            </p>

            <h2 className="mt-2 text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-white">
              Making Every Paris Journey Special
            </h2>

            <p className="mt-4 text-[14px] font-normal leading-[1.55] text-white">
              We are passionate about creating unforgettable travel experiences in the beautiful
              city of Paris. Our goal is to make exploring Paris easy, enjoyable, and stress-free
              for every traveler.
            </p>
          </article>

          {/* Bottom-Right Card: Exclusive Paris Tours */}
          <article
            id="tours"
            className={`w-full max-w-[400px] rounded-[20px] border p-7 text-left transition-colors duration-150 ${
              activeNav === 'Tours'
                ? 'border-white/50 bg-white/[0.11]'
                : 'border-white/20 bg-white/[0.07]'
            }`}
          >
            <p className="text-[13px] font-medium text-white">
              Discover Our Exclusive Paris Tours
            </p>

            <h2 className="mt-2 text-[22px] font-medium leading-[1.2] tracking-[-0.02em] text-white">
              Explore Paris Your Way
            </h2>

            <p className="mt-4 text-[14px] font-normal leading-[1.55] text-white">
              Experience the city&apos;s most beautiful attractions and unforgettable destinations
              with our specially designed travel experiences.
            </p>
          </article>
        </div>
      </section>

      {/* Second Section: Why Choose Us */}
      <section
        aria-label="Why Choose Us"
        className="w-full bg-black px-5 pt-10 pb-24 text-center text-white sm:px-10 sm:pt-12 sm:pb-28 lg:px-14 lg:pt-16 lg:pb-32"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <p className="font-sans text-[14px] font-medium tracking-[0.01em] text-white sm:text-[15px]">
            Why Choose Us?
          </p>

          <h2 className="mt-3 max-w-3xl text-balance font-[family-name:var(--font-editorial)] text-[42px] font-normal italic leading-[1.12] tracking-[-0.015em] text-white sm:text-[56px] lg:text-[68px]">
            Your Journey, Our Priority
          </h2>

          <p className="mt-6 max-w-2xl font-sans text-[15px] font-normal leading-[1.55] text-white sm:text-[17px]">
            Planning a trip should be exciting, not stressful. We make your Paris travel experience
            smooth, comfortable, and memorable.
          </p>

          <div className="mt-14 grid w-full grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-6">
            <article className="rounded-[20px] border border-white/20 bg-white/[0.07] p-7 lg:col-span-2">
              <p className="font-sans text-[13px] font-medium text-white tabular-nums">01.</p>
              <h3 className="mt-3 font-sans text-[20px] font-medium leading-[1.25] tracking-[-0.02em] text-white">
                Personalized Travel Packages
              </h3>
              <p className="mt-3 font-sans text-[14px] font-normal leading-[1.55] text-white">
                Trips designed around your interests and budget.
              </p>
            </article>

            <article className="rounded-[20px] border border-white/20 bg-white/[0.07] p-7 lg:col-span-2">
              <p className="font-sans text-[13px] font-medium text-white tabular-nums">02.</p>
              <h3 className="mt-3 font-sans text-[20px] font-medium leading-[1.25] tracking-[-0.02em] text-white">
                Local Travel Expertise
              </h3>
              <p className="mt-3 font-sans text-[14px] font-normal leading-[1.55] text-white">
                Discover popular attractions and hidden Parisian gems.
              </p>
            </article>

            <article className="rounded-[20px] border border-white/20 bg-white/[0.07] p-7 lg:col-span-2">
              <p className="font-sans text-[13px] font-medium text-white tabular-nums">03.</p>
              <h3 className="mt-3 font-sans text-[20px] font-medium leading-[1.25] tracking-[-0.02em] text-white">
                Hassle-Free Planning
              </h3>
              <p className="mt-3 font-sans text-[14px] font-normal leading-[1.55] text-white">
                We take care of the important travel arrangements.
              </p>
            </article>

            <article className="rounded-[20px] border border-white/20 bg-white/[0.07] p-7 lg:col-span-3">
              <p className="font-sans text-[13px] font-medium text-white tabular-nums">04.</p>
              <h3 className="mt-3 font-sans text-[20px] font-medium leading-[1.25] tracking-[-0.02em] text-white">
                Affordable Travel Options
              </h3>
              <p className="mt-3 font-sans text-[14px] font-normal leading-[1.55] text-white">
                Enjoy memorable experiences with flexible packages.
              </p>
            </article>

            <article className="rounded-[20px] border border-white/20 bg-white/[0.07] p-7 sm:col-span-2 lg:col-span-3">
              <p className="font-sans text-[13px] font-medium text-white tabular-nums">05.</p>
              <h3 className="mt-3 font-sans text-[20px] font-medium leading-[1.25] tracking-[-0.02em] text-white">
                Dedicated Customer Support
              </h3>
              <p className="mt-3 font-sans text-[14px] font-normal leading-[1.55] text-white">
                Assistance throughout your travel planning journey.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Third Section: Discover Our Most Popular Tours (Fanned Carousel from Reference) */}
      <section
        id="popular-tours"
        aria-label="Discover Our Most Popular Tours"
        className="w-full overflow-hidden bg-black px-5 pt-6 pb-14 text-center text-white sm:px-10 sm:pt-8 sm:pb-16 lg:px-14 lg:pt-10 lg:pb-20"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mx-auto max-w-xl text-balance text-[36px] font-medium leading-[1.12] tracking-[-0.025em] text-white sm:text-[48px] lg:text-[54px]">
            Discover{' '}
            <span className="font-[family-name:var(--font-editorial)] font-normal italic">
              Our Most
            </span>
            <br />
            <span className="font-[family-name:var(--font-editorial)] font-normal italic">
              Popular
            </span>{' '}
            Tours
          </h2>

          {/* Fanned 5-Card Carousel */}
          <div className="relative mt-14 flex min-h-[430px] items-center justify-center sm:min-h-[470px]">
            <div className="relative flex w-full items-center justify-center">
              {POPULAR_TOURS.map((tour, index) => {
                const total = POPULAR_TOURS.length;
                let offset = index - activeTourIndex;
                if (offset > Math.floor(total / 2)) offset -= total;
                if (offset < -Math.floor(total / 2)) offset += total;

                const absOffset = Math.abs(offset);
                const isCenter = offset === 0;

                const translateX = offset * 185;
                const scale = isCenter ? 1 : absOffset === 1 ? 0.88 : 0.76;
                const zIndex = 30 - absOffset * 10;
                const opacity = absOffset > 2 ? 0 : isCenter ? 1 : absOffset === 1 ? 0.92 : 0.78;

                return (
                  <article
                    key={tour.id}
                    onClick={() => !isCenter && setActiveTourIndex(index)}
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      zIndex,
                      opacity,
                    }}
                    className={`absolute flex h-[410px] w-[265px] flex-col justify-end overflow-hidden rounded-[24px] border bg-neutral-900 p-5 text-left transition-all duration-300 ease-out sm:h-[440px] sm:w-[290px] ${
                      isCenter
                        ? 'border-white/40 shadow-2xl'
                        : 'border-white/20 cursor-pointer hover:border-white/35'
                    }`}
                  >
                    <img
                      src={tour.image}
                      alt={tour.alt}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15"
                    />

                    <div className="relative z-10">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-sans text-[20px] font-medium leading-[1.2] tracking-[-0.02em] text-white">
                          {tour.title}
                        </h3>
                        <span className="shrink-0 font-sans text-[14px] font-medium text-white tabular-nums">
                          {tour.price}
                        </span>
                      </div>

                      <p className="mt-2 line-clamp-3 font-sans text-[13px] font-normal leading-[1.45] text-white">
                        {tour.description}
                      </p>

                      <div className="mt-3 flex items-center gap-2 font-sans text-[12px] font-normal text-white tabular-nums">
                        <span>{tour.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{tour.duration}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExploreTour(tour.title);
                        }}
                        className="mt-4 w-full rounded-full bg-white py-2.5 text-center font-sans text-[13px] font-medium text-black transition-transform duration-150 hover:scale-[1.02] cursor-pointer"
                      >
                        Explore
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous tour"
              onClick={handlePrevTour}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] text-white transition-colors duration-150 hover:bg-white/[0.16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowAllTours((prev) => !prev)}
              className="font-sans text-[14px] font-medium text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white cursor-pointer"
            >
              {showAllTours ? 'Hide All Tours' : 'View More Tours'}
            </button>

            <button
              type="button"
              aria-label="Next tour"
              onClick={handleNextTour}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] text-white transition-colors duration-150 hover:bg-white/[0.16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Expanded All Tours List when View More Tours is toggled */}
          {showAllTours && (
            <div className="mt-12 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
              {POPULAR_TOURS.map((tour) => (
                <article
                  key={`grid-${tour.id}`}
                  className="flex flex-col justify-between rounded-[20px] border border-white/20 bg-white/[0.07] p-6"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-sans text-[19px] font-medium text-white">{tour.title}</h3>
                      <span className="font-sans text-[14px] font-medium text-white tabular-nums">
                        {tour.price}
                      </span>
                    </div>
                    <p className="mt-1.5 font-sans text-[12px] text-white tabular-nums">
                      {tour.category} · {tour.duration}
                    </p>
                    <p className="mt-3 font-sans text-[14px] leading-[1.55] text-white">
                      {tour.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleExploreTour(tour.title)}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white py-2 font-sans text-[13px] font-medium text-black transition-transform hover:scale-[1.01] cursor-pointer"
                  >
                    Explore
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Fifth Section: Plan Your Dream Paris Getaway (CTA Section) */}
      <section
        id="plan-getaway"
        aria-label="Plan Your Dream Paris Getaway"
        className="w-full bg-black px-5 pt-6 pb-20 text-center text-white sm:px-10 sm:pt-8 sm:pb-24 lg:px-14 lg:pt-10 lg:pb-28"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <p className="font-sans text-[14px] font-medium tracking-[0.01em] text-white sm:text-[15px]">
            Plan Your Dream Paris Getaway
          </p>

          <h2 className="mt-3 text-balance font-[family-name:var(--font-editorial)] text-[42px] font-normal italic leading-[1.12] tracking-[-0.015em] text-white sm:text-[56px] lg:text-[66px]">
            Ready to Fall in Love with Paris?
          </h2>

          <p className="mt-6 max-w-2xl font-sans text-[15px] font-normal leading-[1.6] text-white sm:text-[17px]">
            Your dream Paris adventure is just one step away! Whether you want to admire the Eiffel
            Tower, enjoy a romantic Seine River cruise, explore historic landmarks, or experience
            authentic French culture, we are here to make it happen.
          </p>

          <p className="mt-4 max-w-2xl font-sans text-[15px] font-normal leading-[1.6] text-white sm:text-[17px]">
            Let us help you plan a personalized Paris vacation filled with beautiful destinations,
            unforgettable experiences, and lasting memories.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="group inline-flex items-center gap-4 rounded-full bg-white py-1.5 pl-6 pr-1.5 font-sans text-[14px] font-medium text-black transition-transform duration-150 hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white cursor-pointer"
            >
              <span className="whitespace-nowrap">Plan Your Trip Today</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0066FF] text-white transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="shrink-0 whitespace-nowrap rounded-full border border-white/25 bg-white/[0.08] px-6 py-3 font-sans text-[14px] font-medium text-white transition-colors duration-150 hover:bg-white/[0.16] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Drawer (Open menu) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site Menu"
            className="flex h-full w-full max-w-sm flex-col justify-between border-l border-white/20 bg-black p-8 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[20px] font-bold tracking-[-0.03em] text-white">
                  PARIS VOYAGE
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white transition-colors hover:bg-white/[0.16] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeNav === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        handleNavClick(item);
                      }}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-[18px] font-medium transition-colors cursor-pointer ${
                        isActive ? 'bg-white text-black' : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{item}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-white/15 pt-6">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setContactOpen(true);
                }}
                className="inline-flex w-full items-center justify-between rounded-full bg-white py-2 pl-5 pr-2 text-[14px] font-medium text-black cursor-pointer"
              >
                <span>Plan Your Trip Today</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0066FF] text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paris Travel Package & Tour Inquiry Modal */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={resetContactModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Plan Your Paris Experience"
            className="w-full max-w-md rounded-[24px] border border-white/20 bg-black p-7 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[22px] font-medium tracking-[-0.02em] text-white">
                  Plan Your Paris Journey
                </h2>
                <p className="mt-1.5 text-[14px] text-white">
                  Share your travel dates and preferred Paris experiences.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={resetContactModal}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white transition-colors hover:bg-white/[0.16] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {formSubmitted ? (
              <div className="mt-6 rounded-2xl border border-white/20 bg-white/[0.07] p-6 text-left">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#0066FF] text-white">
                  <Check className="h-4 w-4" />
                </div>
                <h3 className="text-[17px] font-medium text-white">Request received</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white">
                  Thank you, {formState.name}. Our Paris travel specialists will send personalized
                  tour options to {formState.email}.
                </p>
                <button
                  type="button"
                  onClick={resetContactModal}
                  className="mt-5 rounded-full bg-white px-5 py-2 text-[13px] font-medium text-black cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-[13px] font-medium text-white">
                    Full name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Camille Laurent"
                    className="mt-1.5 w-full rounded-xl border border-white/25 bg-white/[0.06] px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/50 focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-dates"
                    className="block text-[13px] font-medium text-white"
                  >
                    Preferred travel dates
                  </label>
                  <input
                    id="contact-dates"
                    type="text"
                    value={formState.travelDates}
                    onChange={(e) => setFormState({ ...formState, travelDates: e.target.value })}
                    placeholder="June 12 – June 18"
                    className="mt-1.5 w-full rounded-xl border border-white/25 bg-white/[0.06] px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/50 focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[13px] font-medium text-white"
                  >
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="camille@example.com"
                    className="mt-1.5 w-full rounded-xl border border-white/25 bg-white/[0.06] px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/50 focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-preferences"
                    className="block text-[13px] font-medium text-white"
                  >
                    Tour interests
                  </label>
                  <textarea
                    id="contact-preferences"
                    rows={3}
                    value={formState.preferences}
                    onChange={(e) => setFormState({ ...formState, preferences: e.target.value })}
                    placeholder="Eiffel Tower, Louvre museum, French culinary tours"
                    className="mt-1.5 w-full resize-none rounded-xl border border-white/25 bg-white/[0.06] px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/50 focus:border-white focus:outline-none"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-[13px] font-medium text-white">
                    {formError}
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-between rounded-full bg-white py-1.5 pl-5 pr-1.5 text-[14px] font-medium text-black transition-transform hover:scale-[1.01] cursor-pointer"
                  >
                    <span>Request Paris Itinerary</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0066FF] text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

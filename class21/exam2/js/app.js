import { getFestivalData } from "./api.js";

import Artist from "./Artist.js";

import { Performance } from "./Performance.js";

import { FeaturedPerformance } from "./FeaturedPerformance.js";

import { PerformanceCard } from "./PerformanceCard.js";

import { renderLoading, renderError, renderPerformances } from "./ui.js";

const loadButton = document.getElementById("load-lineup");

const searchInput = document.getElementById("search-input");

const stageFilter = document.getElementById("stage-filter");

const ticketsFilter = document.getElementById("tickets-filter");

const featuredFilter = document.getElementById("featured-filter");

const sortSelect = document.getElementById("sort-select");

const resetButton = document.getElementById("reset-filters");


let artists = [];
let performances = [];

async function loadLineup() {
  renderLoading;

  loadButton.disabled = true;

  try {
    const data = await getFestivalData();

    const rawArtitstData = await data.artists;
    const rawPerformanceData = await data.performances;

    artists = rawArtitstData.map(
      (item) => new Artist(item.id, item.name, item.country, item.genre),
    );

    performances = rawPerformanceData.map((item) => {
      const artist = artists.find((artist) => artist.id === item.artistId);

      if (item.featured) {
        return new FeaturedPerformance(
          item.id,
          item.title,
          artist,
          item.stage,
          item.time,
          item.ticketPrice,
          item.ticketsRemaining,
          item.featured,
        );
      }

      return new Performance(
        item.id,
        item.title,
        artist,
        item.stage,
        item.time,
        item.ticketPrice,
        item.ticketsRemaining,
      );
    });

    renderPerformances(performances);

    searchInput.disabled = false;
    stageFilter.disabled = false;
    ticketsFilter.disabled = false;
    featuredFilter.disabled = false;
    sortSelect.disabled = false;
    resetButton.disabled = false;
  } catch (error) {
    console.log("Lineup loaded:", error);

    renderError(error.message);
  }

  loadButton.disabled = false;
}

function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const stage = stageFilter.value;

  const availableOnly = ticketsFilter.checked;

  const featuredOnly = featuredFilter.checked;

  const sort = sortSelect.value;

  let visiblePerformances = performances.filter((performance) => {
    const performanceTitle = performance.title.toLowerCase();
    const artistName = performance.artist.artistName.toLowerCase();

    const matchesSearch =
      searchTerm === "" ||
      performanceTitle.includes(searchTerm) ||
      artistName.includes(searchTerm);

    const matchesStage = stage === "" || performance.stage === stage;

    const matchesTickets = !availableOnly || performance.hasTickets;

    const matchesFeatured = !featuredOnly || performance.featured;

    return matchesSearch && matchesStage && matchesTickets && matchesFeatured;
  });

  visiblePerformances = [...visiblePerformances];

  if (sort === "time-asc") {
    visiblePerformances.sort((a, b) => a.time.localeCompare(b.time));
  }

  if (sort === "price-asc") {
    visiblePerformances.sort((a, b) => a.ticketPrice - b.ticketPrice);
  }

  if (sort === "price-desc") {
    visiblePerformances.sort((a, b) => b.ticketPrice - a.ticketPrice);
  }

  if (sort === "artist-asc") {
    visiblePerformances.sort((a, b) =>
      a.artist.artistName.localeCompare(b.artist.artistName),
    );
  }

  renderPerformances(visiblePerformances);
}

function resetFilters() {
  searchInput.value = "";
  stageFilter.value = "";
  ticketsFilter.checked = false;
  featuredFilter.checked = false;
  sortSelect.value = "";

  applyFilters();
}

loadButton.addEventListener("click", loadLineup);

searchInput.addEventListener("change", applyFilters);

stageFilter.addEventListener("input", applyFilters);

ticketsFilter.addEventListener("change", applyFilters);

featuredFilter.addEventListener("change", applyFilters);

sortSelect.addEventListener("change", applyFilters);

resetButton.addEventListener("click", resetFilters);

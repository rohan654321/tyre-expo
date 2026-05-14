// app/exhibition-directory/page.tsx
'use client'

import { useState, useEffect } from 'react'
import CompanyGrid from './company-grid'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown, Filter, X, Loader2 } from 'lucide-react'
import BackToTop from '@/components/layout/BackToTop'
import { fetchExhibitionCompanies, ExhibitionCompany, generateSlug } from '@/lib/api/exhibitorClient'

export default function CompanyDirectory() {
  const router = useRouter()
  const [companies, setCompanies] = useState<ExhibitionCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'gallery' | 'list'>('grid')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const companiesPerPage = 24

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Fetch companies
  useEffect(() => {
    const loadCompanies = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchExhibitionCompanies(currentPage, companiesPerPage, searchQuery)
        setCompanies(result.companies)
        setTotalPages(result.totalPages)
      } catch (err) {
        setError('Failed to load exhibitors. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      loadCompanies()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [currentPage, searchQuery])

  // Filter by letter (client-side filtering)
  const filteredCompanies = selectedLetter
    ? companies.filter(company =>
      company.name?.toUpperCase().startsWith(selectedLetter)
    )
    : companies

  const handleProductBrochure = (companyId: string, companyName: string) => {
    const company = companies.find(c => c.id === companyId)
    const slug = company?.slug || generateSlug(companyName)
    router.push(`/exhibition-directory/${slug}`)
  }

  // Pagination range
  const getPaginationRange = () => {
    if (isMobile) {
      const start = Math.max(1, currentPage - 1)
      const end = Math.min(totalPages, start + 1)
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    } else {
      const maxPages = 5
      let start = Math.max(1, currentPage - Math.floor(maxPages / 2))
      let end = Math.min(totalPages, start + maxPages - 1)

      if (end - start + 1 < maxPages) {
        start = Math.max(1, end - maxPages + 1)
      }

      return Array.from({ length: Math.min(maxPages, totalPages) }, (_, i) => start + i)
    }
  }

  if (loading && companies.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-slate-600">Loading exhibitors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Error display */}
      {error && (
        <div className="fixed top-20 left-0 right-0 z-40 max-w-7xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      <main className="pt-24 sm:pt-28 md:pt-32 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Alphabetical Filter */}
        <div className="mb-6 md:mb-8 mt-10">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            <button
              onClick={() => {
                setSelectedLetter(null)
                setCurrentPage(1)
              }}
              className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${!selectedLetter
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
            >
              All
            </button>

            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedLetter(letter)
                    setCurrentPage(1)
                  }}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded text-sm font-medium transition-colors border flex items-center justify-center ${selectedLetter === letter
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                    }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-slate-600 mt-4">
            Showing {filteredCompanies.length} companies {selectedLetter && `starting with "${selectedLetter}"`}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by company name or sector..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setCurrentPage(1)
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-6 gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white text-slate-600 border border-slate-300'
              }`}
          >
            <GridIcon />
          </button>
          <button
            onClick={() => setViewMode('gallery')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'gallery' ? 'bg-orange-500 text-white' : 'bg-white text-slate-600 border border-slate-300'
              }`}
          >
            <GalleryIcon />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white text-slate-600 border border-slate-300'
              }`}
          >
            <ListIcon />
          </button>
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : (
          <CompanyGrid
            companies={filteredCompanies}
            viewMode={viewMode}
            onProductBrochureClick={handleProductBrochure}
          />
        )}

        {/* Pagination */}
        {!loading && filteredCompanies.length > 0 && totalPages > 1 && (
          <div className="mt-8 md:mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${currentPage === 1
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  <ChevronLeftIcon />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {getPaginationRange().map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${currentPage === page
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${currentPage === totalPages
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-100'
                    }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No companies found</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedLetter(null)
                setCurrentPage(1)
              }}
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
      <BackToTop />
    </div>
  )
}

// Icons
function GridIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 4h16v16H4V4zm2 4v8l6-4-6-4z" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="2" rx="1" />
      <rect x="3" y="11" width="18" height="2" rx="1" />
      <rect x="3" y="18" width="18" height="2" rx="1" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}
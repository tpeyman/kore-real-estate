import { useState, useRef, useEffect } from 'react';
import { usePhoneInput, CountryIso2, ParsedCountry } from 'react-international-phone';
import 'react-international-phone/style.css';

interface PhoneInputFieldProps {
  value: string;
  onChange: (phone: string, isValid: boolean) => void;
  className?: string;
  defaultCountry?: CountryIso2;
}

const PhoneInputField = ({ value, onChange, className, defaultCountry = 'ae' }: PhoneInputFieldProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const {
    inputValue,
    phone: fullPhone,
    country,
    setCountry,
    handlePhoneValueChange,
    inputRef,
  } = usePhoneInput({
    defaultCountry,
    value,
    onChange: ({ phone, country }) => {
      // E.164 validation: starts with + and has 7-15 digits
      const digits = phone.replace(/\D/g, '');
      const isValid = digits.length >= 7 && digits.length <= 15 && phone.startsWith('+');
      onChange(phone, isValid);
    },
    disableDialCodePrefill: false,
    forceDialCode: true,
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setSearch('');
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      searchRef.current?.focus();
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const handleCountrySelect = (iso2: CountryIso2) => {
    setCountry(iso2);
    setShowDropdown(false);
    setSearch('');
    inputRef.current?.focus();
  };

  // Country data for dropdown
  const allCountries = useAllCountries();
  const filtered = search
    ? allCountries.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dialCode.includes(search)
      )
    : allCountries;

  const inputClass = className || "w-full px-6 py-4 rounded-xl border border-border bg-card text-foreground font-sans text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300";

  return (
    <div className="relative">
      <div className={inputClass + " flex items-center gap-0 !px-0 overflow-visible"}>
        {/* Country selector button */}
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-1.5 px-3 py-0 border-r border-border shrink-0 hover:bg-secondary/50 transition-colors rounded-l-xl h-full min-h-[1.5rem]"
        >
          <span className="text-lg leading-none">{country ? getFlag(country.iso2) : '🌐'}</span>
          <span className="text-foreground font-sans text-sm">+{country?.dialCode}</span>
          <span className="text-muted-foreground text-xs">▼</span>
        </button>

        {/* Phone number input */}
        <input
          ref={inputRef}
          type="tel"
          value={inputValue}
          onChange={handlePhoneValueChange}
          placeholder="123456789"
          className="flex-1 bg-transparent border-none outline-none font-sans text-base text-foreground placeholder:text-muted-foreground px-3 py-0 min-w-0"
        />
      </div>

      {/* Country dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl border border-border bg-card shadow-2xl max-h-60 overflow-hidden flex flex-col"
        >
          <div className="p-2 border-b border-border">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.map((c) => (
              <button
                key={c.iso2}
                type="button"
                onClick={() => handleCountrySelect(c.iso2)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-secondary/50 transition-colors font-sans text-sm ${
                  country?.iso2 === c.iso2 ? 'bg-secondary text-foreground' : 'text-foreground'
                }`}
              >
                <span className="text-lg leading-none">{getFlag(c.iso2)}</span>
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-muted-foreground text-xs">+{c.dialCode}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Convert ISO2 country code to flag emoji
function getFlag(iso2: string): string {
  const codePoints = iso2
    .toUpperCase()
    .split('')
    .map((char) => 0x1f1e6 - 65 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Hook to get all countries from the library
function useAllCountries() {
  const [countries, setCountries] = useState<Array<{ iso2: CountryIso2; name: string; dialCode: string }>>([]);

  useEffect(() => {
    import('react-international-phone').then((mod) => {
      if (mod.defaultCountries) {
        const parsed = mod.defaultCountries.map((c: any) => {
          // Country data format: [name, iso2, dialCode, format, priority, areaCodes]
          return {
            name: c[0] as string,
            iso2: c[1] as CountryIso2,
            dialCode: c[2] as string,
          };
        });
        setCountries(parsed);
      }
    });
  }, []);

  return countries;
}

export default PhoneInputField;

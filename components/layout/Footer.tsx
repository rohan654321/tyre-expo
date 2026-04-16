import Image from 'next/image';
import Link from 'next/link';
import Container from '../ui/container';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      {/* Top Section */}
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Logo */}
          <div>
            <Image
              src="/ITS.png"
              alt="MiningWorld Russia"
              width={100}
              height={60}
              className="object-contain"
            />
          </div>

          {/* Contacts */}
          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-semibold uppercase tracking-wide text-white mb-2">
                Contacts and Support
              </h5>
              <a
                href="mailto:miningsupportrussia@ite.group"
                className="hover:text-white"
              >
                miningsupportrussia@ite.group
              </a>
            </div>

            <div>
              <h5 className="text-sm font-semibold uppercase tracking-wide text-white mb-2">
                Hotline
              </h5>
              <a href="tel:+74957995585" className="hover:text-white">
                +7-(495)-799-55-85
              </a>
            </div>

            <div>
              <h5 className="text-sm font-semibold uppercase tracking-wide text-white mb-2">
                Visitor Support
              </h5>
              <a href="tel:+74957995585" className="hover:text-white">
                +7-(495)-799-55-85
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wide text-white mb-3">
              Opening Hours
            </h5>
            <div className="space-y-1">
              <p>22 April 2026: 10:00 - 18:00</p>
              <p>23 April 2026: 10:00 - 18:00</p>
              <p>24 April 2026: 10:00 - 16:00</p>
            </div>
          </div>

          {/* Venue */}
          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wide text-white mb-3">
              Exhibition Venue
            </h5>
            <p>
              Crocus Expo IEC, Russia, Moscow, Pavilion 1
            </p>
          </div>
        </div>
      </Container>

      {/* Divider Line */}
      {/* <div className="border-t border-orange-500/40" /> */}

      {/* Powered By */}
      <Container>
        <div className="flex justify-end py-2 text-xs text-white">
          Powered By{' '}
          <a
            href="https://prismetic.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 font-semibold uppercase hover:underline"
          >
            PRISMETIC
          </a>
        </div>
      </Container>

      {/* Bottom Section */}
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-[#F08400] py-6">
          {/* Left */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Organised By</span>
            <Image
              src="/imgs/ite-logo.png"
              alt="ITE"
              width={70}
              height={25}
            />
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
            <p className="border-r border-gray-500 pr-3">
              ©MiningWorld 2026. All Right Reserved
            </p>

            <Link href="#" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
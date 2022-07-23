import { classNames } from '../helpers'
import useEns from '../hooks/useEns'
import getProfile from '../lens-api/get-profile'

type AddressProps = {
  address: string
  className?: string
}

const shortAddress = (addr: string): string =>
  addr.length > 10 && addr.startsWith('0x')
    ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
    : addr

const Address = ({ address, className }: AddressProps): JSX.Element => {
  const { name, loading } = useEns(address)
  const usern: string = getProfile(address)
  return (
    <span
      className={classNames(
        className || '',
        'font-mono',
        loading ? 'animate-pulse' : ''
      )}
      title={address}
    >
      {usern || name || shortAddress(address)}
    </span>
  )
}

export default Address

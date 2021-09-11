import {withPrefix} from "@onflow/fcl"
import {useParams} from "react-router-dom"

export default function useAddress() {
  const {address} = useParams()
  return withPrefix(address)
}
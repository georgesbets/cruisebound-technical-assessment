import * as React from 'react';
import { useMemo } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Cruise } from '@/app/definitions';
import { getMonthAbbreviation } from '@/app/utils';
import Itinerary from '@/app/components/itinerary';

interface ResultCardProps {
  cruise: Cruise;
}

const CruiseResultCard = (props: ResultCardProps) => {
  const { cruise } = props;

  const derivedDurationString = useMemo(() => {
    const departureDate = cruise.departureDate;
    const returnDate = cruise.returnDate;

    let result: string;

    if (
      departureDate.getMonth() === returnDate.getMonth() &&
      departureDate.getFullYear() === returnDate.getFullYear()
    ) {
      result = `${getMonthAbbreviation(
        departureDate.getMonth()
      )} ${departureDate.getDate()} - ${returnDate.getDate()}, ${departureDate.getFullYear()}`;
    } else {
      if (returnDate.getFullYear() === departureDate.getFullYear()) {
        result = `${getMonthAbbreviation(departureDate.getMonth())} ${departureDate.getDate()} - ${getMonthAbbreviation(returnDate.getMonth())} ${returnDate.getDate()}, ${returnDate.getFullYear()}`;
      } else {
        result = `${getMonthAbbreviation(departureDate.getMonth())} ${departureDate.getDate()}, ${departureDate.getFullYear()} - ${getMonthAbbreviation(returnDate.getMonth())} ${returnDate.getDate()}, ${returnDate.getFullYear()}`;
      }
    }

    return result;
  }, [cruise.departureDate, cruise.returnDate]);

  return (
    <div className={'flex w-120 h-30 rounded-xl shadow overflow-hidden'}>
      <div
        className="w-1/4 p-2 bg-cover bg-center rounded-l-lg"
        style={{ backgroundImage: `url(${cruise.ship.image})` }}
      >
        <div
          className={
            'inline-block p-[5px] pr-[10px] pl-[10px] rounded bg-black bg-opacity-80 h-0.25 w-auto text-white text-[14px]'
          }
        >
          {derivedDurationString}
        </div>
      </div>
      <div className={'w-3/4 flex flex-col bg-white'}>
        <div className={'grid grid-cols-5 h-[120px] w-full p-3.5'}>
          <div className={'col-span-4'}>
            <div className={'text-xl text-black'}>
              {cruise.name}
              <div>
                <span
                  className={'text-gray-700 text-sm'}
                >{`${cruise.region} ${cruise.duration} nights`}</span>
                <span>
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: 'gold', fontSize: '15px' }}
                  />
                </span>
                <span className={'text-black text-sm pl-[5px] pr-[5px]'}>
                  {cruise.ship.rating}
                </span>
                <span className={'text-gray-500 text-xs'}>
                  {`${cruise.ship.reviews} reviews`}
                </span>
              </div>
              <Itinerary stops={cruise.itinerary} />
            </div>
          </div>
          <div className={'col-span-1 justify-items-end'}>
            <img
              className={'w-12'}
              src={cruise.ship.line.logo}
              alt={`${cruise.ship.line.name}-cruise-line-logo`}
            />
            <div className={'text-xs text-gray-500 text-right'}>
              {cruise.ship.line.name}
            </div>
          </div>
        </div>
        <div
          className={
            'flex h-[75px] w-full bg-gray-100 justify-end items-center'
          }
        >
          <div className={'text-xs text-gray-500 justify-items-end'}>
            Interior from
            <div
              className={'text-black text-lg'}
            >{`$${Math.round(cruise.price)}`}</div>
          </div>
          <div className={'pl-[20px] pr-[20px]'}>
            <button
              className={
                'h-[35px] w-[100px] rounded bg-blue-600 text-white text-[16px]'
              }
            >
              See sailings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CruiseResultCard;

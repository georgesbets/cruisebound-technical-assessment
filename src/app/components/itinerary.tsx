import * as React from 'react';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface ItineraryProps {
  stops: string[];
}

const Itinerary = (props: ItineraryProps) => {
  const { stops } = props;

  const trimStop = (stop: string) => {
    let commaSeperatedFragments = stop.split(',');

    if (commaSeperatedFragments.length > 1) {
      commaSeperatedFragments = commaSeperatedFragments.slice(
        0,
        commaSeperatedFragments.length - 1
      );
    }

    const stopWithoutParens = commaSeperatedFragments[0].split('(');

    return stopWithoutParens[0];
  };

  const trimmedStops = useMemo(() => {
    return stops.map((stop) => trimStop(stop));
  }, [stops]);

  return (
    <div className={'leading-[5px]'}>
      {trimmedStops.map((stop, index) => (
        <span key={`stop-${index}`} className={'text-sm'}>
          {stop}
          {index < stops.length - 1 && (
            <FontAwesomeIcon
              className={'pl-[5px] pr-[5px]'}
              icon={faArrowRight}
              fontSize={'10px'}
              style={{ color: 'blue' }}
            />
          )}
        </span>
      ))}
    </div>
  );
};

export default Itinerary;

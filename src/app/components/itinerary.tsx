import * as React from 'react';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface ItineraryProps {
  stops: string[];
}

const Itinerary = (props: ItineraryProps) => {
  const { stops } = props;

  const MAX_DISPLAYED_STOPS = 10;

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
      {trimmedStops.map((stop, index) => {
        if (index < MAX_DISPLAYED_STOPS || index === trimmedStops.length - 1) {
          return (
            <span key={`stop-${index}`} className={'text-sm'}>
              {stop}
              {index < trimmedStops.length - 1 && (
                <FontAwesomeIcon
                  className={'pl-[5px] pr-[5px]'}
                  icon={faArrowRight}
                  fontSize={'10px'}
                  style={{ color: 'blue' }}
                />
              )}
            </span>
          );
        } else if (index === MAX_DISPLAYED_STOPS) {
          return (
            <span key={'ellipses'}>
              ...
              <FontAwesomeIcon
                className={'pl-[5px] pr-[5px]'}
                icon={faArrowRight}
                fontSize={'10px'}
                style={{ color: 'blue' }}
              />
            </span>
          );
        }
      })}
    </div>
  );
};

export default Itinerary;

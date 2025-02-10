import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface ItineraryProps {
  stops: string[];
}

const Itinerary = (props: ItineraryProps) => {
  const { stops } = props;

  return (
    <div className={'leading-[5px]'}>
      {stops.map((stop, index) => (
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

export const getMonthString = (month) => {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  return months[month];
};

export const formatCurrency = (value, options, useDefaultOptions = true) => {
  if (value === 0) return 'GRATIS';

  const formatOptions = Object.assign(
    useDefaultOptions
      ? {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }
      : {},
    options
  );

  return Intl.NumberFormat('id-ID', formatOptions).format(value);
};

export const displayContentBlocks = (blocks) => {
  if (blocks?.length !== 0) {
    const contentOutput = blocks.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return <p key={index + 10} dangerouslySetInnerHTML={{ __html: block.data.text }} />;

        case 'list':
          if (block.data.style === 'unordered') {
            const unordered = block.data.items.map((item, idx) => (
              <li key={idx + 200 * index} dangerouslySetInnerHTML={{ __html: item }} />
            ));
            return (
              <ul style={{ paddingLeft: '2rem' }} key={index + 100}>
                {unordered}
              </ul>
            );
          } else if (block.data.style === 'ordered') {
            const ordered = block.data.items.map((item, idx) => (
              <li key={idx + 250 * index} dangerouslySetInnerHTML={{ __html: item }} />
            ));
            return (
              <ol style={{ paddingLeft: '2rem' }} key={index - 100}>
                {ordered}
              </ol>
            );
          }

        case 'image':
          const { withBackground, withBorder, stretched } = block.data;

          return (
            <>
              <div
                key={index - 50}
                className={`mt-6 rounded-lg overflow-hidden ${withBorder ? 'border border-gray-200 shadow-lg' : ''}  ${
                  stretched ? 'w-full' : 'w-11/12 mx-auto'
                } ${withBackground ? 'bg-gray-300 py-4 text-center' : ''}`}
                style={{ alignSelf: 'center' }}
              >
                <img
                  src={block.data.file.url}
                  alt=""
                  className={`${withBackground ? 'w-1/2 block mx-auto' : 'w-full'}`}
                  style={{ maxWidth: '100%' }}
                />
              </div>
              <small
                className="block text-center mx-auto text-gray-600 mt-4"
                style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              >
                {block.data.caption}
              </small>
            </>
          );

        default:
          return;
      }
    });

    return contentOutput;
  }
};

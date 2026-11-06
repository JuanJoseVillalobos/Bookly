import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Compass,
  Mountain,
  Trees,
  Eye,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Card, Badge } from '../../../components/common';
import { experiences } from '../../../data/experiences';

/**
 * CategoriesSection
 * Categorical discovery gateway allowing visitors to explore experiences by activity style.
 */
export default function CategoriesSection() {
  const { t } = useTranslation('home');

  // Map category identifiers to tailored icon, background photo and color accents
  const categoryConfigs = [
    {
      id: 'adventure',
      icon: <Mountain className="w-6 h-6 text-forest" />,
      bgImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=70',
    },
    {
      id: 'excursion',
      icon: <Compass className="w-6 h-6 text-forest" />,
      bgImage: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=70',
    },
    {
      id: 'nature',
      icon: <Trees className="w-6 h-6 text-forest" />,
      bgImage: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=70',
    },
    {
      id: 'scenic-views',
      icon: <Eye className="w-6 h-6 text-forest" />,
      bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=70',
    },
  ];

  // Calculate experience count per category dynamically from experiences data
  const getExperienceCount = (categoryId) => {
    return experiences.filter((exp) => exp.category?.id === categoryId).length || 1;
  };

  return (
    <section className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="max-w-2xl">
        <Badge variant="stone" size="sm" icon={<Sparkles className="w-3 h-3" />} className="mb-2">
          {t('categories.badge')}
        </Badge>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
          {t('categories.title')}
        </h2>
        <p className="text-sm sm:text-base text-charcoal-muted mt-2 font-normal leading-relaxed">
          {t('categories.subtitle')}
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryConfigs.map((cat) => {
          const count = getExperienceCount(cat.id);
          const title = t(`categories.items.${cat.id}.title`);
          const description = t(`categories.items.${cat.id}.description`);

          return (
            <Link
              key={cat.id}
              to={`/explore?category=${cat.id}`}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-2xl"
            >
              <Card
                hoverEffect
                className="relative h-full flex flex-col justify-between p-6 sm:p-7 bg-white border border-stone transition-all duration-300 group-hover:-translate-y-1 group-hover:border-forest/40 group-hover:shadow-lg"
              >
                <div>
                  {/* Category Icon and count pill */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-forest-subtle flex items-center justify-center group-hover:bg-sand-gold/20 transition-colors">
                      {cat.icon}
                    </div>
                    <span className="text-xs font-medium text-charcoal-muted px-2.5 py-1 rounded-full bg-stone-light">
                      {t('categories.countLabel', { count })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-forest transition-colors mb-2">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed line-clamp-3">
                    {description}
                  </p>
                </div>

                {/* Footer link cue */}
                <div className="pt-6 mt-4 border-t border-stone/60 flex items-center justify-between text-xs font-semibold text-forest">
                  <span>{t('categories.exploreCategory')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}


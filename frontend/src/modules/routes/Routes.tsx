import { useState, useEffect, type ReactNode } from "react";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from 'react-icons/fi';

import { jsonGet } from "../../api/client";
import { type NavItem, type NavResponse } from "../routes/types/routes";

import Table from "../../components/Table";
import Button from "../../components/Button";

interface TableColumn<T> {
  label: string;
  render: (rowData: T) => ReactNode;
  header?: () => ReactNode;
  headerClassName?: string;
}

function Routes() {
  const [routes, setRoutes] = useState<NavItem[]>([]);

  useEffect(() => {
    jsonGet<NavResponse>('/routes')
      .then(data => setRoutes(data.navigation))
      .catch(err => console.error("Error: ", err));
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = (FiIcons as any)[iconName] || (FaIcons as any)[iconName];
    return IconComponent ? <IconComponent className="table-icon" /> : <FaIcons.FaCircle className="table-icon" />;
  };

  const config: TableColumn<NavItem>[] = [
    {
      label: 'Nazwa',
      headerClassName: 'th-name',
      render: (route) => <span className="table-cell-bold">{route.name}</span>
    },
    {
      label: 'Ścieżka',
      headerClassName: 'th-route',
      render: (route) => <span className="table-cell-code">/{route.route}</span>
    },
    {
      label: 'Ikona',
      headerClassName: 'th-icon text-center',
      render: (route) => <div className="text-center">{renderIcon(route.icon)}</div>
    },
    {
      label: 'Akcje',
      headerClassName: 'w-0 text-center',
      render: (route) => (
        <div className="table-actions justify-content-end">
          <Button outline secondary size="sm">
            <FaIcons.FaPencilAlt />
          </Button>
          <Button outline danger size="sm">
            <FaIcons.FaTrash />
          </Button>
        </div>
      )
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 style={{ color: 'var(--app-dark-brown)', fontWeight: 700 }}>
            Zarządzanie Zakładkami
          </h2>
          <Button primary rounded>
            <FaIcons.FaPlus className="me-2" /> Dodaj nową
          </Button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Table
            data={routes}
            config={config}
            keyFn={(route) => route.id}
          />
        </div>
      </div>
    </div>
  );
}

export default Routes;
